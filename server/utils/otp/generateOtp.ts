interface GeneratedCodeProps {
  otp: string;
  expiry: number;
}

export const generateOTP = (): GeneratedCodeProps => {
  const otp = Math.floor(10000 + Math.random() * 90000).toString();

  const expiryDate = new Date(Date.now() + 5 * 60 * 1000);
  const expiry = Math.floor(expiryDate.getTime() / 1000);

  return { otp, expiry };
};
