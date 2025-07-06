import { ValidationError } from "@/infrastructure/errors/customErrors";
import { OAuthData, SignUpData } from "@/internal/auth/dto";

import { generateAndSendVerificationCode } from "@/utils/email/nodemailer";
import { storeTemporaryUser } from "@/utils/otp/redisStore";

export const sendOtpToEmail = async (
  email: string,
  validUser: SignUpData | OAuthData,
  feature: "oauth" | "reset-password"
) => {
  try {
    const { otp, expiry } = await generateAndSendVerificationCode(
      email,
      feature
    );
    const tempKey = await storeTemporaryUser(validUser, otp, expiry);
    return tempKey;
  } catch (error) {
    console.log(error);
    throw new ValidationError("Failed to process the sign up");
  }
};
