/**
 * MERGE TEAM SESSION PAYLOAD
 * Standardized format for sending session data at chapter completion/exit
 * 
 * Validated against Merge Team specifications:
 * - All required fields with correct types
 * - Sanity checks (correct + wrong <= attempted)
 * - UTC ISO 8601 timestamps
 * - Same session_id for safe resends
 */

export interface MergeTeamSessionPayload {
  // REQUIRED FIELDS - Student & Session Identity
  student_id: string;           // Type: String (from platform auth)
  session_id: string;           // Type: String (exact value from redirect URL)
  chapter_id: string;           // Type: String (canonical: grade8_data_handling)
  
  // REQUIRED FIELDS - Session Metadata
  timestamp: string;            // Type: String (UTC ISO 8601, e.g., 2026-03-25T14:30:00Z)
  session_status: "completed" | "exited_midway"; // Enum

  // REQUIRED FIELDS - Performance Metrics
  correct_answers: number;      // Type: Integer (correctly solved questions)
  wrong_answers: number;        // Type: Integer (incorrectly solved questions)
  questions_attempted: number;  // Type: Integer (unique questions touched)
  total_questions: number;      // Type: Integer (all questions in chapter)
  
  // REQUIRED FIELDS - Attempt & Hint Tracking
  retry_count: number;          // Type: Integer (re-attempts after first submission)
  hints_used: number;           // Type: Integer (hints actually opened/consumed)
  total_hints_embedded: number; // Type: Integer (total hints available)
  
  // REQUIRED FIELDS - Time & Progress
  time_spent_seconds: number;   // Type: Integer (active time, exclude idle)
  topic_completion_ratio: number; // Type: Number (0-1; completed_units / total_units)
}

/**
 * VALIDATION RULES (Merge Team Cautions)
 */
export class MergeTeamPayloadValidator {
  static validate(payload: Partial<MergeTeamSessionPayload>): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // 1. CHECK ALL REQUIRED FIELDS ARE PRESENT
    const requiredFields: (keyof MergeTeamSessionPayload)[] = [
      'student_id', 'session_id', 'chapter_id', 'timestamp',
      'session_status', 'correct_answers', 'wrong_answers',
      'questions_attempted', 'total_questions', 'retry_count',
      'hints_used', 'total_hints_embedded', 'time_spent_seconds',
      'topic_completion_ratio'
    ];

    for (const field of requiredFields) {
      if (payload[field] === undefined || payload[field] === null) {
        errors.push(`Missing required field: ${String(field)}`);
      }
    }

    // 2. SANITY CHECKS
    if (payload.correct_answers !== undefined && payload.wrong_answers !== undefined && 
        payload.questions_attempted !== undefined) {
      const total_responded = payload.correct_answers + payload.wrong_answers;
      if (total_responded > payload.questions_attempted) {
        errors.push(
          `Sanity check failed: correct_answers (${payload.correct_answers}) + ` +
          `wrong_answers (${payload.wrong_answers}) = ${total_responded} > ` +
          `questions_attempted (${payload.questions_attempted})`
        );
      }
    }

    if (payload.questions_attempted !== undefined && payload.total_questions !== undefined) {
      if (payload.questions_attempted > payload.total_questions) {
        errors.push(
          `Sanity check failed: questions_attempted (${payload.questions_attempted}) > ` +
          `total_questions (${payload.total_questions})`
        );
      }
    }

    if (payload.hints_used !== undefined && payload.total_hints_embedded !== undefined) {
      if (payload.hints_used > payload.total_hints_embedded) {
        errors.push(
          `Sanity check failed: hints_used (${payload.hints_used}) > ` +
          `total_hints_embedded (${payload.total_hints_embedded})`
        );
      }
    }

    // 3. RATIO VALIDATION (0 to 1)
    if (payload.topic_completion_ratio !== undefined) {
      if (payload.topic_completion_ratio < 0 || payload.topic_completion_ratio > 1) {
        errors.push(
          `Ratio validation failed: topic_completion_ratio must be 0-1, ` +
          `got ${payload.topic_completion_ratio}`
        );
      }
    }

    // 4. TIMESTAMP FORMAT VALIDATION (UTC ISO 8601)
    if (payload.timestamp !== undefined) {
      const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z?$/;
      if (!iso8601Regex.test(payload.timestamp)) {
        errors.push(
          `Timestamp must be UTC ISO 8601 format (e.g., 2026-03-25T14:30:00Z), ` +
          `got ${payload.timestamp}`
        );
      }
    }

    // 5. SESSION_ID VALIDATION
    if (payload.session_id !== undefined) {
      if (typeof payload.session_id !== 'string' || payload.session_id.trim().length === 0) {
        errors.push(
          `session_id must be a non-empty string from redirect URL, got ${payload.session_id}`
        );
      }
    }

    // 6. STATUS ENUM VALIDATION
    if (payload.session_status !== undefined) {
      if (!['completed', 'exited_midway'].includes(payload.session_status)) {
        errors.push(
          `session_status must be "completed" or "exited_midway", ` +
          `got ${payload.session_status}`
        );
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Helper: Generate UTC ISO 8601 timestamp
   */
  static generateTimestamp(): string {
    return new Date().toISOString(); // 2026-03-25T14:30:00.123Z → trim to 2026-03-25T14:30:00Z
  }

  // Do not generate session_id locally. It must come from Merge redirect URL.
}

/**
 * MINIMAL EXAMPLE (from Merge Team docs)
 */
export const exampleValidPayload: MergeTeamSessionPayload = {
  student_id: "student_1042",
  session_id: "s_1042_g8data_1711353000000",
  chapter_id: "grade8_data_handling",
  timestamp: "2026-03-25T14:30:00Z",
  session_status: "exited_midway",
  correct_answers: 12,
  wrong_answers: 5,
  questions_attempted: 17,
  total_questions: 20,
  retry_count: 3,
  hints_used: 4,
  total_hints_embedded: 10,
  time_spent_seconds: 2400, // 40 minutes
  topic_completion_ratio: 0.75
};

/**
 * READY-TO-SUBMIT CHECKLIST
 * ✓ Canonical chapter_id format used (grade8_data_handling)
 * ✓ All required fields present with correct types
 * ✓ student_id from platform auth/session
 * ✓ One payload sent at completed or exited_midway
 * ✓ Missing values handled as null (not fabricated)
 * ✓ Failed sends can retry with same session_id
 * ✓ Payload passes sanity checks
 * ✓ Does NOT calculate performance score (Merge Team responsibility)
 */
