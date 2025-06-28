import { UserController } from "@/internal/user/controller";
import { UserRepository } from "@/internal/user/repository";
import { UserService } from "@/internal/user/service";

const userRepository = new UserRepository();

const userService = new UserService(userRepository);

export const userController = new UserController(userService);
