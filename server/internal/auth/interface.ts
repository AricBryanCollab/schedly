import { SignUpData } from "@/internal/auth/dto";

export interface IAuthRepository {
  createUser(signUpData: SignUpData): Promise<IAuthResponse>;
  findByEmail(email: string): Promise<IAuthResponse | null>;
  findByUserId(userId: string): Promise<IAuthResponse | null>;
}

export interface IAuthResponse {
  id: string;
  username: string;
  password?: string;
}
