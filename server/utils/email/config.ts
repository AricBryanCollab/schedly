import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

if (
  !process.env.SMTP_SERVER ||
  !process.env.SMTP_EMAIL ||
  !process.env.SMTP_PASSWORD
) {
  throw new Error("Missing SMTP configuration in environment variables.");
}

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER as string,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SMTP_EMAIL as string,
    pass: process.env.SMTP_PASSWORD as string,
  },
});
