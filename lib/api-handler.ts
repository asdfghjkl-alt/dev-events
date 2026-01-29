import { NextResponse, NextRequest } from "next/server";

// Custom Error class to include status codes
export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

type ApiHandler = (
  req: NextRequest,
  ...args: any[]
) => Promise<NextResponse | Response>;

export const apiHandler =
  (handler: ApiHandler) =>
  async (req: NextRequest | Request, ...args: any[]) => {
    try {
      return await handler(req as NextRequest, ...args);
    } catch (error: any) {
      console.error("API Error:", error);

      const statusCode = error.statusCode || 500;
      const message = error.message || "Internal Server Error";

      // Handle Mongoose Validation Errors specifically if needed
      if (error.name === "ValidationError") {
        return NextResponse.json(
          { message: "Validation Error", errors: error.errors },
          { status: 400 },
        );
      }

      // Handle Mongoose Duplicate Key Errors
      if (error.code === 11000) {
        return NextResponse.json(
          {
            message: "Duplicate value entered",
            field: Object.keys(error.keyValue),
          },
          { status: 409 },
        );
      }

      return NextResponse.json({ message }, { status: statusCode });
    }
  };
