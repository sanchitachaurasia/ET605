import { PayloadRetryQueue } from '../types';
import { MergeApiPayload, MergeSessionPayload } from './mergePayload';

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
  payload: MergeSessionPayload | MergeApiPayload,
  endpoint: string,
  token?: string
): Promise<{ success: boolean; payloadId?: string; error?: string; data?: any }> => {
  try {
    console.log('[Merge][Transport] Sending recommendation request', {
      endpoint,
      sessionId: payload.session_id,
      tokenPresent: Boolean(token),
    });
    console.log('[Merge][Transport] Request payload body', payload);

    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      keepalive: true
    });

    console.log('[Merge][Transport] Response received', {
      endpoint,
      sessionId: payload.session_id,
      status: response.status,
      ok: response.ok,
    });

    let responseData: any = null;
    try {
      responseData = await response.json();
    } catch {
      responseData = null;
    }

    if (!response.ok) {
      const error = `HTTP ${response.status}: ${response.statusText}`;
      const payloadId = generatePayloadId();
      queuePayloadForRetry({ payload, token, failedPayloadId: payloadId });
      return { success: false, payloadId, error };
    }

    return { success: true, data: responseData };
  } catch (err: any) {
    const payloadId = generatePayloadId();
    queuePayloadForRetry({ payload, token, failedPayloadId: payloadId });
    return {
      success: false,
      payloadId,
      error: err?.message || 'Network error occurred'
    };
  }
};

/**
 * Queue a payload for retry without attempting to submit immediately.
 */
export const queueSubmissionForRetry = (
  payload: MergeSessionPayload | MergeApiPayload,
  token?: string
): void => {
  queuePayloadForRetry({ payload, token, failedPayloadId: payload.session_id });
};

/**
 * Processes retry queue - attempts to resubmit failed payloads
 */
export const processRetryQueue = async (endpoint: string): Promise<void> => {
  archiveFailedPayloads();
  const readyForRetry = getPayloadsReadyForRetry();

  if (readyForRetry.length === 0) return;

  console.log('[Merge][Retry] Processing queued payloads', {
    count: readyForRetry.length,
    endpoint,
  });

  for (const item of readyForRetry) {
    try {
      const queuedPayload = item.payload?.payload || item.payload;
      const queuedToken = item.payload?.token || sessionStorage.getItem('token') || undefined;
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (queuedToken) {
        headers.Authorization = `Bearer ${queuedToken}`;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(queuedPayload),
        keepalive: true
      });

      console.log('[Merge][Retry] Retry response', {
        payloadId: item.payloadId,
        sessionId: queuedPayload?.session_id,
        status: response.status,
        ok: response.ok,
      });
      console.log('[Merge][Retry] Retry payload body', queuedPayload);

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
