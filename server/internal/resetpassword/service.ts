import {
  AuthorizationError,
  NotFoundError,
  ValidationError,
} from "@/infrastructure/errors/customErrors";
import { UpdatePassword } from "@/internal/resetpassword/interface";
import { ResetPasswordRepository } from "@/internal/resetpassword/repository";

import { toHashPassword } from "@/utils/auth/bcrypt";
import { retrieveRedisData } from "@/utils/otp/redisStore";
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

  async verifyResetCode(key: string, otp: string) {
    const data = await retrieveRedisData(key, "reset-password");
    if (!data) {
      throw new ValidationError("Verification expired or invalid");
    }

    const { storedOtp } = data;

    let isVerified: boolean;
    if (storedOtp != otp) {
      throw new ValidationError("Invalid OTP");
    }

    isVerified = true;

    return isVerified;
  }

  async updatePassword({
    email,
    password,
    confirmPassword,
  }: UpdatePassword<string>) {
    if (!email) {
      throw new ValidationError("Email is missing and required");
    }

    if (password != confirmPassword) {
      throw new ValidationError("Password does not match");
    }

    const hashedPassword = await toHashPassword(password);

    await this.resetPasswordRepository.updatePassword(email, hashedPassword);

    return email;
  }
}
