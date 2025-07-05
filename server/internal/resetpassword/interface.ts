export interface IResetPasswordRepository {
  updatePassword(email: string, hashedPassword: string): Promise<void>;
}
