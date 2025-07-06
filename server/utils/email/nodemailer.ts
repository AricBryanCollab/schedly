import { transporter } from "@/utils/email/config";
import {
  oAuthVerificationTemplate,
  passwordResetTemplate,
} from "@/utils/email/templates";

import { generateOTP } from "@/utils/otp/generateOtp";

export const generateAndSendVerificationCode = async (
  email: string,
  feature: "oauth" | "reset-password"
) => {
  const { otp, expiry } = generateOTP();
  const mailOptions = {
    from: '"Schedly" <your-email@example.com>',
    to: email,
    subject:
      feature === "reset-password"
        ? "Schedly User Password Reset Code"
        : "Schedly User Authentication Verification",
    html:
      feature === "reset-password"
        ? passwordResetTemplate(otp)
        : oAuthVerificationTemplate(otp),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`message ID: ${info.messageId}`);
    console.log(`Verification code sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification email");
  }

  return { otp, expiry };
};
