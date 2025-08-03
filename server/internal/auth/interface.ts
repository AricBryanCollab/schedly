import { SignUpData } from "@/internal/auth/dto";

export interface IAuthRepository {
  createUser(signUpData: SignUpData): Promise<IAuthResponse>;
  findUserByEmail(email: string): Promise<IAuthResponse | null>;
  findUserByUsername(username: string): Promise<IAuthResponse | null>;
  findUserByUserId(userId: string): Promise<IAuthResponse | null>;
}

export interface IAuthResponse {
  id: string;
  username: string;
  password?: string | null;
  provider?: string | null;
}
