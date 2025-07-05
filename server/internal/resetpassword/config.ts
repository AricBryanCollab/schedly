import { ResetPasswordController } from "@/internal/resetpassword/controller";
import { ResetPasswordRepository } from "@/internal/resetpassword/repository";
import { ResetPasswordService } from "@/internal/resetpassword/service";

const resetPasswordRepository = new ResetPasswordRepository();

const resetPasswordService = new ResetPasswordService(resetPasswordRepository);

export const resetPasswordController = new ResetPasswordController(
  resetPasswordService
);
