import { AuthMiddleware } from "@/infrastructure/middleware/auth";
import { AuthController } from "@/internal/auth/controller";
import { AuthRepository } from "@/internal/auth/repository";
import { AuthService } from "@/internal/auth/service";

const authRepository = new AuthRepository();

const authService = new AuthService(authRepository);
const middleware = new AuthMiddleware(authService);

export const authController = new AuthController(authService);

export const protectRoute = middleware.protectRoute.bind(middleware);
