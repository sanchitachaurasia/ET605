/**
 * Session Data Validation Rules and Utils
 * Ensures data integrity according to the specification
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface MetricsValidation {
  correct: number;
  wrong: number;
  attempted: number;
  total: number;
  retries: number;
  hintsUsed: number;
  totalHints: number;
  completionRatio: number;
  sessionStatus?: 'completed' | 'exited_midway';
}

/**
 * Validates that metrics follow the constraint rules:
 * - correct + wrong == attempted
 * - attempted ≤ total
 * - retries ≤ attempted
 * - hints_used ≤ total_hints
 * - ratios between 0–1
 * - if completed, attempted must equal total
 */
export const validateMetrics = (metrics: MetricsValidation): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Rule 1: correct + wrong == attempted
  if (metrics.correct + metrics.wrong !== metrics.attempted) {
    errors.push(
      `Constraint violated: correct (${metrics.correct}) + wrong (${metrics.wrong}) = ${metrics.correct + metrics.wrong} must equal attempted (${metrics.attempted})`
    );
  }

  // Rule 2: attempted ≤ total
  if (metrics.attempted > metrics.total) {
    errors.push(
      `Constraint violated: attempted (${metrics.attempted}) > total (${metrics.total})`
    );
  }

  // Rule 3: retries ≤ attempted
  if (metrics.retries > metrics.attempted) {
    errors.push(
      `Constraint violated: retry_count (${metrics.retries}) > attempted (${metrics.attempted})`
    );
  }

  // Rule 4: hints_used ≤ total_hints
  if (metrics.hintsUsed > metrics.totalHints) {
    errors.push(
      `Constraint violated: hints_used (${metrics.hintsUsed}) > total_hints (${metrics.totalHints})`
    );
  }

  // Rule 5: ratios between 0–1
  if (metrics.completionRatio < 0 || metrics.completionRatio > 1) {
    errors.push(
      `Invalid ratio: topic_completion_ratio (${metrics.completionRatio}) must be between 0 and 1`
    );
  }

  // Rule 6: completed session must attempt all questions
  if (metrics.sessionStatus === 'completed' && metrics.attempted !== metrics.total) {
    errors.push(
      `Constraint violated: completed session requires attempted (${metrics.attempted}) == total (${metrics.total})`
    );
  }

  // Warn on missing values (0 used for missing)
  if (metrics.total === 0) {
    warnings.push('Total questions is 0 (possible missing data)');
  }
  if (metrics.attempted === 0 && metrics.total > 0) {
    warnings.push('No questions attempted (unusual for completed session)');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * Normalizes numerical fields, handling null/NaN/0
 */
export const normalizeMetricsValue = (
  value: number | null | undefined,
  fieldName: string,
  options: { defaultValue: number; treatZeroAsNull: boolean }
): { value: number; isMissing: boolean } => {
  const { defaultValue, treatZeroAsNull } = options;

  if (value === null || value === undefined) {
    return { value: defaultValue, isMissing: true };
  }

  if (Number.isNaN(value)) {
    return { value: defaultValue, isMissing: true };
  }

  if (treatZeroAsNull && value === 0) {
    return { value: defaultValue, isMissing: true };
  }

  return { value, isMissing: false };
};

/**
 * Handles missing values according to spec:
 * - null for truly missing data
 * - 0 for fields where 0 is valid
 * - Flag suspicious 0s that might indicate missing data
 */
export const sanitizeMetrics = (metrics: MetricsValidation) => {
  const sanitized = { ...metrics };
  const missingFields: string[] = [];

  // Fields where 0 is suspicious
  const suspiciousZeroFields = {
    attempted: metrics.attempted === 0 && metrics.total > 0,
    correct: metrics.correct === 0 && metrics.attempted > 0,
    wrong: metrics.wrong === 0 && metrics.attempted > 0
  };

  if (suspiciousZeroFields.attempted) {
    missingFields.push('attempted (0 but total > 0)');
  }

  return { sanitized, missingFields, hasMissingData: missingFields.length > 0 };
};

/**
 * Validates single numeric value
 */
export const validateNumericField = (
  value: any,
  fieldName: string,
  min: number = 0,
  max: number = Infinity
): { isValid: boolean; error?: string; value: number } => {
  if (value === null || value === undefined) {
    return { isValid: false, error: `${fieldName} is null or undefined`, value: 0 };
  }

  if (Number.isNaN(value)) {
    return { isValid: false, error: `${fieldName} is NaN`, value: 0 };
  }

  const numValue = Number(value);

  if (numValue < min) {
    return { isValid: false, error: `${fieldName} (${numValue}) < minimum (${min})`, value: numValue };
  }

  if (numValue > max) {
    return { isValid: false, error: `${fieldName} (${numValue}) > maximum (${max})`, value: numValue };
  }

  return { isValid: true, value: numValue };
};
