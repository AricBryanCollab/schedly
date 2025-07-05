import { ResetPasswordRepository } from "@/internal/resetpassword/repository";

export class ResetPasswordService {
  constructor(
    private readonly resetPasswordRepository: ResetPasswordRepository
  ) {}

  async requestResetPassword() {}

  async verifyResetCode() {}

  async updatePassword() {}
}
