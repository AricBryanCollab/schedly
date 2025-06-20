import { ErrorResponseProps } from "@/infrastructure/middleware/interface";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const handlePrismaError = (
  error: PrismaClientKnownRequestError
): ErrorResponseProps => {
  switch (error.code) {
    case "P2002": //Unique constraint violation
      return {
        status: "failed",
        message: "A record with this value already exists",
      };

    case "P2014": //Invalid ID
      return {
        status: "failed",
        message: "Invalid ID was provided",
      };

    case "P2025": //Record Not Found
      return {
        status: "failed",
        message: "Record not found",
      };

    case "P2003": //Foreign key constraint violation
      return {
        status: "error",
        message: "Foreign key violation",
      };
    default:
      return {
        status: "error",
        message: "Database Operation Failed",
      };
  }
};
