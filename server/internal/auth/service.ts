import { AuthRepository } from "@/internal/auth/repository";

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async signUp() {}

  async signIn() {}

  async oAuth() {}
}
