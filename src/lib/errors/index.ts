/**
 * @file index.ts
 * @description Enterprise Domain Error Hierarchy and Functional Result types.
 *
 * Implements standard Clean Architecture error boundaries to replace untyped
 * exception throwing and generic catch blocks with strongly typed domain errors.
 */

/**
 * Standard Application Error base class.
 */
export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly details?: unknown;

  constructor(
    message: string,
    code: string = "INTERNAL_ERROR",
    statusCode: number = 500,
    isOperational: boolean = true,
    details?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Error thrown when input validation fails against domain schemas.
 */
export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, "VALIDATION_ERROR", 422, true, details);
  }
}

/**
 * Error thrown when an internal invariant of the planning engine is violated.
 */
export class PlanningEngineError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, "PLANNING_ENGINE_ERROR", 400, true, details);
  }
}

/**
 * Error thrown when storage persistence (e.g. LocalStorage) encounters an error.
 */
export class StorageError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, "STORAGE_ERROR", 500, true, details);
  }
}

/**
 * Error thrown when request rate limits are exceeded.
 */
export class RateLimitError extends AppError {
  public readonly retryAfterSeconds: number;

  constructor(message: string, retryAfterSeconds: number = 60) {
    super(message, "RATE_LIMIT_EXCEEDED", 429, true, { retryAfterSeconds });
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

/**
 * Functional Result Pattern for deterministic, exception-free execution.
 */
export type Result<T, E = AppError> =
  | { success: true; data: T; error?: never }
  | { success: false; error: E; data?: never };

/**
 * Wraps a successful value into a Result.
 */
export function Ok<T>(data: T): Result<T, never> {
  return { success: true, data };
}

/**
 * Wraps a failure error into a Result.
 */
export function Err<E>(error: E): Result<never, E> {
  return { success: false, error };
}
