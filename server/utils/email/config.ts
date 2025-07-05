import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER as string,
  port: parseInt(process.env.SMTP_PORT as string),
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL as string,
    pass: process.env.SMTP_PASSWORD as string,
  },
});
