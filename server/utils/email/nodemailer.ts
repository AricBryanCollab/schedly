import { transporter } from "@/utils/email/config";
import {
  oAuthVerificationTemplate,
  passwordResetTemplate,
} from "@/utils/email/templates";

import { generateOTP } from "@/utils/otp/generateOtp";

export const generateVerificationCode = async (
  email: string,
  feature: "password-reset" | "oauth"
) => {
  const { code, expiry } = generateOTP();
  const mailOptions = {
    from: '"Schedly" <your-email@example.com>',
    to: email,
    subject: "Schedly User Password Reset Code",
    html:
      feature === "password-reset"
        ? passwordResetTemplate(code)
        : oAuthVerificationTemplate(code),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`message ID: ${info.messageId}`);
    console.log(`Verification code sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send verification email");
  }

  return { code, expiry };
};
