import { PayloadRetryQueue, MergeSessionPayload } from '../types';

const RETRY_QUEUE_KEY = 'dataquest-payload-retry-queue';
const FAILED_PAYLOADS_KEY = 'dataquest-failed-payloads';
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 5000; // 5 seconds between retries

/**
 * Generates a unique payload ID
 */
export const generatePayloadId = (): string => {
  return `payload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Calculates next retry time exponentially
 */
const getNextRetryTime = (attemptCount: number): Date => {
  const delayMs = RETRY_DELAY_MS * Math.pow(2, attemptCount - 1); // exponential backoff
  return new Date(Date.now() + delayMs);
};

/**
 * Adds a payload to the retry queue
 */
export const queuePayloadForRetry = (payload: any): PayloadRetryQueue => {
  const retryItem: PayloadRetryQueue = {
    payloadId: generatePayloadId(),
    payload,
    attempts: 0,
    maxAttempts: MAX_RETRIES,
    lastAttempted: new Date().toISOString(),
    nextRetryAt: getNextRetryTime(0).toISOString()
  };

  const queue = getRetryQueue();
  queue.push(retryItem);
  localStorage.setItem(RETRY_QUEUE_KEY, JSON.stringify(queue));

  return retryItem;
};

/**
 * Gets all queued payloads
 */
export const getRetryQueue = (): PayloadRetryQueue[] => {
  const stored = localStorage.getItem(RETRY_QUEUE_KEY);
  return stored ? JSON.parse(stored) : [];
};

/**
 * Removes a payload from retry queue after successful submission
 */
export const removeFromRetryQueue = (payloadId: string): void => {
  const queue = getRetryQueue();
  const filtered = queue.filter(item => item.payloadId !== payloadId);
  localStorage.setItem(RETRY_QUEUE_KEY, JSON.stringify(filtered));
};

/**
 * Updates retry attempts for a payload
 */
export const updateRetryAttempt = (payloadId: string, error?: string): PayloadRetryQueue | null => {
  const queue = getRetryQueue();
  const item = queue.find(p => p.payloadId === payloadId);

  if (!item) return null;

  item.attempts += 1;
  item.lastAttempted = new Date().toISOString();
  item.nextRetryAt = getNextRetryTime(item.attempts).toISOString();
  if (error) {
    item.error = error;
  }

  localStorage.setItem(RETRY_QUEUE_KEY, JSON.stringify(queue));
  return item;
};

/**
 * Gets payloads ready for retry (those past nextRetryAt time)
 */
export const getPayloadsReadyForRetry = (): PayloadRetryQueue[] => {
  const queue = getRetryQueue();
  const now = new Date();

  return queue.filter(item => {
    const isReady = new Date(item.nextRetryAt) <= now;
    const hasRetries = item.attempts < item.maxAttempts;
    return isReady && hasRetries;
  });
};

/**
 * Moves failed payloads (exceeded retries) to failed storage
 */
export const archiveFailedPayloads = (): void => {
  const queue = getRetryQueue();
  const now = new Date();

  const failed = queue.filter(
    item =>
      item.attempts >= item.maxAttempts ||
      (item.attempts > 0 && new Date(item.lastAttempted).getTime() < now.getTime() - 86400000) // older than 24h
  );

  if (failed.length > 0) {
    const failedList = JSON.parse(localStorage.getItem(FAILED_PAYLOADS_KEY) || '[]');
    failedList.push(
      ...failed.map(item => ({
        ...item,
        archivedAt: new Date().toISOString()
      }))
    );
    localStorage.setItem(FAILED_PAYLOADS_KEY, JSON.stringify(failedList));

    // Remove from active queue
    const remaining = queue.filter(item => !failed.find(f => f.payloadId === item.payloadId));
    localStorage.setItem(RETRY_QUEUE_KEY, JSON.stringify(remaining));
  }
};

/**
 * Submits payload with retry mechanism
 */
export const submitPayloadWithRetry = async (
  payload: MergeSessionPayload,
  endpoint: string
): Promise<{ success: boolean; payloadId?: string; error?: string }> => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    });

    if (!response.ok) {
      const error = `HTTP ${response.status}: ${response.statusText}`;
      const payloadId = generatePayloadId();
      queuePayloadForRetry({ ...payload, failedPayloadId: payloadId });
      return { success: false, payloadId, error };
    }

    return { success: true };
  } catch (err: any) {
    const payloadId = generatePayloadId();
    queuePayloadForRetry({ ...payload, failedPayloadId: payloadId });
    return {
      success: false,
      payloadId,
      error: err?.message || 'Network error occurred'
    };
  }
};

/**
 * Processes retry queue - attempts to resubmit failed payloads
 */
export const processRetryQueue = async (endpoint: string): Promise<void> => {
  archiveFailedPayloads();
  const readyForRetry = getPayloadsReadyForRetry();

  if (readyForRetry.length === 0) return;

  for (const item of readyForRetry) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item.payload),
        keepalive: true
      });

      if (response.ok) {
        removeFromRetryQueue(item.payloadId);
        console.log(`✓ Payload ${item.payloadId} submitted successfully on retry`);
      } else {
        updateRetryAttempt(item.payloadId, `HTTP ${response.status}`);
      }
    } catch (err: any) {
      updateRetryAttempt(item.payloadId, err?.message);
    }
  }
};

/**
 * Gets stats about retry queue
 */
export const getRetryQueueStats = () => {
  const queue = getRetryQueue();
  const failed = JSON.parse(localStorage.getItem(FAILED_PAYLOADS_KEY) || '[]');

  return {
    queuedCount: queue.length,
    readyForRetryCount: getPayloadsReadyForRetry().length,
    failedCount: failed.length,
    totalAttempts: queue.reduce((sum, item) => sum + item.attempts, 0)
  };
};

/**
 * Reuses session_id for duplicate submissions (idempotency check)
 * Returns true if this exact session_id was already submitted
 */
export const isDuplicateSubmission = (sessionId: string): boolean => {
  const submitted = JSON.parse(localStorage.getItem('dataquest-submitted-sessions') || '[]');
  return submitted.includes(sessionId);
};

/**
 * Marks a session_id as submitted (for duplicate detection)
 */
export const markSessionAsSubmitted = (sessionId: string): void => {
  const submitted = JSON.parse(localStorage.getItem('dataquest-submitted-sessions') || '[]');
  if (!submitted.includes(sessionId)) {
    submitted.push(sessionId);
    localStorage.setItem('dataquest-submitted-sessions', JSON.stringify(submitted));
  }
};

/**
 * Clear retry queue (admin only)
 */
export const clearRetryQueue = (): void => {
  localStorage.removeItem(RETRY_QUEUE_KEY);
};

/**
 * Clear failed payloads (admin only)
 */
export const clearFailedPayloads = (): void => {
  localStorage.removeItem(FAILED_PAYLOADS_KEY);
};
