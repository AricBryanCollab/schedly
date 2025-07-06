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

      const key = await this.resetPasswordService.requestResetPassword(email);

      res
        .status(200)
        .json({ message: "OTP Verification was sent to your email", key: key });
    } catch (error) {
      next(error);
    }
  }

  async verifyResetCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { key, otp } = req.body;

      const isVerified = await this.resetPasswordService.verifyResetCode(
        key,
        otp
      );

      res.status(200).json({ isVerified: isVerified });
    } catch (error) {
      next(error);
    }
  }

  async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, confirmPassword } = req.body;

      const updatedEmail = await this.resetPasswordService.updatePassword({
        email,
        password,
        confirmPassword,
      });

      res.status(200).json({
        message: "Updating user password successful",
        email: updatedEmail,
      });
    } catch (error) {
      next(error);
    }
  }
}
