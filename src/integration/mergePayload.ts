import { StudentSession } from '../types';

export interface MergeSessionPayload {
  student_id: string;
  session_id: string;
  chapter_id: string;
  timestamp: string;
  session_status: 'completed' | 'exited_midway';
  correct_answers: number;
  wrong_answers: number;
  questions_attempted: number;
  total_questions: number;
  retry_count: number;
  hints_used: number;
  total_hints_embedded: number;
  time_spent_seconds: number;
  topic_completion_ratio: number;
}

export const mergePayloadFormatter = (
  session: StudentSession,
  sessionId: string,
  status: 'completed' | 'exited_midway',
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
  return {
    student_id: session.studentId,
    session_id: sessionId,
    chapter_id: 'grade8_data_handling',
    timestamp: new Date().toISOString(),
    session_status: status,
    correct_answers: metrics.correct,
    wrong_answers: metrics.wrong,
    questions_attempted: metrics.attempted,
    total_questions: metrics.total,
    retry_count: metrics.retries,
    hints_used: metrics.hintsUsed,
    total_hints_embedded: metrics.totalHints,
    time_spent_seconds: metrics.timeSpent,
    topic_completion_ratio: metrics.completionRatio,
  };
};
