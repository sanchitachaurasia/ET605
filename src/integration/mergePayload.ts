import { StudentSession, SessionMetrics } from '../types';
import { validateMetrics, MetricsValidation } from '../lib/sessionValidation';

export interface MergeSessionPayload {
  student_id: string;
  session_id: string;
  chapter_id: string;
  timestamp: string; // UTC ISO 8601 format (required)
  session_status: 'completed' | 'exited_midway';
  correct_answers: number | null;
  wrong_answers: number | null;
  questions_attempted: number | null; // unique count
  total_questions: number | null;
  retry_count: number | null;
  hints_used: number | null;
  total_hints_embedded: number | null;
  time_spent_seconds: number | null; // active time only
  topic_completion_ratio: number | null; // between 0-1
  validation_passed?: boolean;
  validation_errors?: string[];
}

/**
 * Validates the formatted payload before submission
 */
export const validatePayload = (payload: MergeSessionPayload): { isValid: boolean; errors: string[] } => {
  const requiredFields = [
    ['correct_answers', payload.correct_answers],
    ['wrong_answers', payload.wrong_answers],
    ['questions_attempted', payload.questions_attempted],
    ['total_questions', payload.total_questions],
    ['retry_count', payload.retry_count],
    ['hints_used', payload.hints_used],
    ['total_hints_embedded', payload.total_hints_embedded],
    ['time_spent_seconds', payload.time_spent_seconds],
    ['topic_completion_ratio', payload.topic_completion_ratio]
  ] as const;

  const missingErrors = requiredFields
    .filter(([, value]) => value === null || value === undefined || Number.isNaN(value as number))
    .map(([field]) => `Missing required field: ${field}`);

  const metricsValidation: MetricsValidation = {
    correct: payload.correct_answers ?? 0,
    wrong: payload.wrong_answers ?? 0,
    attempted: payload.questions_attempted ?? 0,
    total: payload.total_questions ?? 0,
    retries: payload.retry_count ?? 0,
    hintsUsed: payload.hints_used ?? 0,
    totalHints: payload.total_hints_embedded ?? 0,
    completionRatio: payload.topic_completion_ratio ?? 0,
    sessionStatus: payload.session_status
  };

  const result = validateMetrics(metricsValidation);
  return {
    isValid: result.isValid && missingErrors.length === 0,
    errors: [...missingErrors, ...result.errors]
  };
};

export const mergePayloadFormatter = (
  session: StudentSession,
  sessionId: string,
  status: 'completed' | 'exited_midway',
  chapterId: string,
  metrics: {
    correct: number | null;
    wrong: number | null;
    attempted: number | null;
    total: number | null;
    retries: number | null;
    hintsUsed: number | null;
    totalHints: number | null;
    timeSpent: number | null;
    completionRatio: number | null;
  }
): MergeSessionPayload => {
  // Helper to set null if missing or NaN
  const safe = (v: any) => (v === undefined || v === null || Number.isNaN(v) ? null : v);

  const payload: MergeSessionPayload = {
    student_id: safe(session.studentId),
    session_id: safe(sessionId),
    chapter_id: safe(chapterId),
    timestamp: new Date().toISOString(), // UTC ISO 8601
    session_status: status,
    correct_answers: safe(metrics.correct),
    wrong_answers: safe(metrics.wrong),
    questions_attempted: safe(metrics.attempted),
    total_questions: safe(metrics.total),
    retry_count: safe(metrics.retries),
    hints_used: safe(metrics.hintsUsed),
    total_hints_embedded: safe(metrics.totalHints),
    time_spent_seconds: safe(metrics.timeSpent),
    topic_completion_ratio:
      safe(metrics.completionRatio) === null
        ? null
        : Math.max(0, Math.min(1, metrics.completionRatio)) // clamp to 0-1
  };

  // Validate payload
  const validation = validatePayload(payload);
  payload.validation_passed = validation.isValid;
  if (!validation.isValid) {
    payload.validation_errors = validation.errors;
  }

  return payload;
};
