export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true,
    public reason?: Error
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
    if (reason) this.stack += `\n Root Cause: ${reason.stack}`;
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(400, message);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = "Authentication Failed") {
    super(401, message);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = "Access Denied. Not Authorized.") {
    super(403, message);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(404, `${resource} is not found`);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = "Failed Database Query") {
    super(500, message);
  }
}

export class CloudinaryError extends AppError {
  constructor(message: string = "Failed at Cloudinary Service") {
    super(500, message);
  }
}
