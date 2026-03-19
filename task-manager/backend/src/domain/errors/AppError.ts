export class AppError extends Error {
  constructor(
    public code: "CONFLICT" | "UNAUTHORIZED" | "VALIDATION_ERROR" | "INTERNAL",
    message: string,
    public status: number
  ) {
    super(message);
  }
}