interface GeneratedCodeProps {
  code: string;
  expiry: Date;
}

export const generateOTP = (): GeneratedCodeProps => {
  const code = Math.floor(10000 + Math.random() * 90000).toString();
  const expiry = new Date(Date.now() + 5 * 60 * 1000);

  return { code, expiry };
};
