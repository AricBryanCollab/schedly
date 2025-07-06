import {
  AuthorizationError,
  NotFoundError,
  ValidationError,
} from "@/infrastructure/errors/customErrors";
import { ResetPasswordRepository } from "@/internal/resetpassword/repository";
import { sendOtpToEmail } from "@/utils/otp/sendOTP";

export class ResetPasswordService {
  constructor(
    private readonly resetPasswordRepository: ResetPasswordRepository
  ) {}

  async requestResetPassword(email: string) {
    if (!email) {
      throw new NotFoundError("Email is not found");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ValidationError("Invalid email address");
    }

    const existingUser =
      await this.resetPasswordRepository.findUserByEmail(email);

    if (existingUser?.provider != null) {
      throw new AuthorizationError(
        "User logged in with a third-party provider are not allowed with this feature"
      );
    }

    const redisKey = sendOtpToEmail(email, "reset-password");

    return redisKey;
  }

  async verifyResetCode() {}

  async updatePassword() {}
}
