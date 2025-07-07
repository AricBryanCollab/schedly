import { ValidationError } from "@/infrastructure/errors/customErrors";
import {
  UpdateProfilePicRequest,
  UpdateUserRequest,
} from "@/internal/user/interface";
import { UserRepository } from "@/internal/user/repository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async updateUser({ userId, userData }: UpdateUserRequest) {
    const { email } = userData;

    if (email) {
      const existingUser = await this.userRepository.findUser("email", email);
      if (existingUser?.email == email) {
        throw new ValidationError("Email already exist on other user");
      }
    }

    const user = await this.userRepository.updateUser({ userId, userData });

    const userResData = {
      id: user.id,
      email: user.email,
      username: user.username,
      timezone: user.timezone,
    };

    return userResData;
  }

  async updateProfilePicture({ userId, imageUrl }: UpdateProfilePicRequest) {}

  async deleteUser(userId: string) {}

  async getAllUsers() {}
}
