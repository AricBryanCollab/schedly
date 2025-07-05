import { ResetPasswordService } from "@/internal/resetpassword/service";
import { NextFunction, Request, Response } from "express";

export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {
    this.requestResetPassword = this.requestResetPassword.bind(this);
    this.verifyResetCode = this.verifyResetCode.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  async requestResetPassword(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async verifyResetCode(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
}
