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
      const { email } = req.body;

      await this.resetPasswordService.requestResetPassword(email);

      res
        .status(200)
        .json({ message: "OTP Verification was sent to your email" });
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
