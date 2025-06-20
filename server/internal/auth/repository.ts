import { SignUpData } from "@/internal/auth/dto";
import { IAuthRepository, IAuthResponse } from "@/internal/auth/interface";

export class AuthRepository implements IAuthRepository {
  createUser(signUpData: SignUpData): Promise<IAuthResponse> {
    throw new Error("Method not implemented.");
  }
  findByEmail(email: string): Promise<IAuthResponse | null> {
    throw new Error("Method not implemented.");
  }
  findByUserId(userId: string): Promise<IAuthResponse | null> {
    throw new Error("Method not implemented.");
  }
}
