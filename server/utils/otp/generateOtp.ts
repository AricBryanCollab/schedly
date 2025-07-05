interface GeneratedCodeProps {
  otp: string;
  expiry: number;
}

export const generateOTP = (): GeneratedCodeProps => {
  const otp = Math.floor(10000 + Math.random() * 90000).toString();

  const expiry = 300;

  return { otp, expiry };
};
