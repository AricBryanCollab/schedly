export interface IResetPasswordRepository {
  findUserByEmail(email: string): Promise<UserData | null>;
  updatePassword(email: string, hashedPassword: string): Promise<void>;
}

export interface UserData {
  username: string;
  email: string | null;
  provider: string | null;
}
