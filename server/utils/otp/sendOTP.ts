import { ValidationError } from "@/infrastructure/errors/customErrors";
import { OAuthData, SignUpData } from "@/internal/auth/dto";

import { generateAndSendVerificationCode } from "@/utils/email/nodemailer";
import {
  storePasswordResetOTP,
  storeTemporaryUser,
} from "@/utils/otp/redisStore";

export const sendOtpToEmail = async (
  email: string,
  feature: "oauth" | "reset-password",
  validUser?: SignUpData | OAuthData
) => {
  try {
    const { otp, expiry } = await generateAndSendVerificationCode(
      email,
      feature
    );

    let tempKey: string;
    if (feature == "oauth") {
      if (!validUser) throw new Error("A user data is required");
      tempKey = await storeTemporaryUser(validUser, otp, expiry);
    } else {
      tempKey = await storePasswordResetOTP(email, otp, expiry);
    }

    return tempKey;
  } catch (error) {
    console.log(error);
    throw new ValidationError("Failed to process the sign up");
  }
};
