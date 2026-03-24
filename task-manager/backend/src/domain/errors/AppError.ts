export type AppErrorCode =
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "INTERNAL";

export class AppError extends Error {
  constructor(
    public code: AppErrorCode,
    message: string,
    public status: number,
    public details?: unknown
  ) {
    super(message);
  }
}