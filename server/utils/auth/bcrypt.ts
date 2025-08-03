import bcrypt from "bcryptjs";

interface HashedPassword {
  hashedPassword: string;
  cryptSalt: string;
}

export const toHashPassword = async (
  password: string
): Promise<HashedPassword> => {
  const cryptSalt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, cryptSalt);

  return { hashedPassword, cryptSalt };
};

export const validatePassword = async (
  password: string,
  storedPassword: string
) => {
  const isPasswordMatched = await bcrypt.compare(password, storedPassword);
  return isPasswordMatched;
};
