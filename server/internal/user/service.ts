import {
  NotFoundError,
  ValidationError,
} from "@/infrastructure/errors/customErrors";
import { defaultProfilePic } from "@/internal/auth/repository";
import { FileInput, UpdateUserRequest } from "@/internal/user/interface";
import { UserRepository } from "@/internal/user/repository";

import { deleteImage, uploadImage } from "@/utils/uploads/cloudinary";

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

  async updateProfilePicture(userId: string, file: FileInput) {
    if (!file) {
      throw new NotFoundError("Image file not found");
    }

    const user = await this.userRepository.findUserProfilePic(userId);
    if (user?.profilePic != null && user?.profilePic != defaultProfilePic) {
      deleteImage(user.profilePic);
    }

    const imageUrl = await uploadImage({
      filePath: file.path,
      folder: "profile-picture",
      deleteLocalFile: true,
    });

    const updatedProfile = this.userRepository.updateProfilePicture({
      userId,
      imageUrl,
    });

    return updatedProfile;
  }

  async deleteUser(userId: string) {}

  async getAllUsers() {}
}
