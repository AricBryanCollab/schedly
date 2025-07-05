import { transporter } from "@/utils/email/config";
import { passwordResetTemplate } from "@/utils/email/templates";

interface GeneratedCodeProps {
  code: string;
  expiry: Date;
}

export const generateAndSendVerificationCode = async (
  email: string
): Promise<GeneratedCodeProps> => {
  const code = Math.floor(10000 + Math.random() * 90000).toString();
  const expiry = new Date(Date.now() + 5 * 60 * 1000);

  const mailOptions = {
    from: '"Schedly" <your-email@example.com>',
    to: email,
    subject: "Schedly User Password Reset Code",
    html: passwordResetTemplate(code),
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
