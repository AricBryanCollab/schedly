import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

import {
  AppError,
  CloudinaryError,
} from "@/infrastructure/errors/customErrors";

import { ErrorResponseProps } from "@/infrastructure/middleware/interface";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { JsonWebTokenError } from "jsonwebtoken";
import multer from "multer";

export const errorHandler: ErrorRequestHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error({
    name: error.name,
    message: error.message,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });

  const defaultErrorResponse: ErrorResponseProps = {
    status: "error",
    message: "Something went wrong, internal server error",
  };

  let errorResponse = { ...defaultErrorResponse };

  // Custom Errors
  if (error instanceof AppError) {
    errorResponse = {
      status: error.statusCode < 500 ? "failed" : "error",
      message: error.message,
    };
    res.status(error.statusCode).json(errorResponse);
    return;
  }

  // Prisma Errors
  // if(error instance of PrismaClientKnownRequestError) {
  // 		errorResponse = handlePrismaError(error);
  // 		res.status(errorResponse.status === "fail" ? 400:500).json(errorResponse);
  // 		return;
  // }

  if (error instanceof PrismaClientValidationError) {
    errorResponse = {
      status: "failed",
      message: "Invalid data provided",
    };
    res.status(400).json(errorResponse);
    return;
  }

  // Multer Errors
  if (error instanceof multer.MulterError) {
    errorResponse = {
      status: "failed",
      message: error.message,
    };

    res.status(400).json(errorResponse);
    return;
  }

  // JWT Errors
  if (error instanceof JsonWebTokenError) {
    errorResponse = {
      status: "failed",
      message: "Invalid token",
    };
    res.status(401).json(errorResponse);
    return;
  }

  // Cloudinary Errors
  if (error instanceof CloudinaryError) {
    errorResponse = {
      status: "error",
      message: error.message,
    };
    res.status(500).json(errorResponse);
    return;
  }

  // Validation Errors
  if (error.name === "ValidationError") {
    errorResponse = {
      status: "failed",
      message: "Validation failed",
      errors: (error as any).errors,
    };
    res.status(400).json(errorResponse);
    return;
  }

  if (process.env.NODE_ENV === "development") {
    errorResponse.stack = error.stack;
  }

  // Default
  res.status(500).json(errorResponse);
};
