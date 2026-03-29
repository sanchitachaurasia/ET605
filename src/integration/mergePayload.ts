import { StudentSession, SessionMetrics } from '../types';
import { validateMetrics, MetricsValidation } from '../lib/sessionValidation';

export interface MergeSessionPayload {
  student_id: string;
  session_id: string;
  chapter_id: string;
  timestamp: string; // UTC ISO 8601 format (required)
  session_status: 'completed' | 'exited_midway';
  correct_answers: number;
  wrong_answers: number;
  questions_attempted: number; // unique count
  total_questions: number;
  retry_count: number;
  hints_used: number;
  total_hints_embedded: number;
  time_spent_seconds: number; // active time only
  topic_completion_ratio: number; // between 0-1
  validation_passed?: boolean;
  validation_errors?: string[];
}

/**
 * Validates the formatted payload before submission
 */
export const validatePayload = (payload: MergeSessionPayload): { isValid: boolean; errors: string[] } => {
  const metricsValidation: MetricsValidation = {
    correct: payload.correct_answers,
    wrong: payload.wrong_answers,
    attempted: payload.questions_attempted,
    total: payload.total_questions,
    hintsUsed: payload.hints_used,
    totalHints: payload.total_hints_embedded,
    completionRatio: payload.topic_completion_ratio
  };

  const result = validateMetrics(metricsValidation);
  return {
    isValid: result.isValid,
    errors: result.errors
  };
};

export const mergePayloadFormatter = (
  session: StudentSession,
  sessionId: string,
  status: 'completed' | 'exited_midway',
  chapterId: string,
  metrics: {
    correct: number;
    wrong: number;
    attempted: number;
    total: number;
    retries: number;
    hintsUsed: number;
    totalHints: number;
    timeSpent: number;
    completionRatio: number;
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
