import { AuthController } from "@/internal/auth/controller";
import { AuthRepository } from "@/internal/auth/repository";
import { AuthService } from "@/internal/auth/service";

const authRepository = new AuthRepository();

const authService = new AuthService(authRepository);
export const authController = new AuthController(authService);
