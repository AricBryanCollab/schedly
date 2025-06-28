import {
  UpdateProfilePicRequest,
  UpdateUserRequest,
} from "@/internal/user/interface";
import { UserRepository } from "@/internal/user/repository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async updateUser({ userId, userData }: UpdateUserRequest) {}

  async updateProfilePicture({ userId, imageUrl }: UpdateProfilePicRequest) {}

  async deleteUser(userId: string) {}

  async getAllUsers() {}
}
