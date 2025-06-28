import { UserData } from "@/internal/user/dto";
import {
  IUserRepository,
  UpdateProfilePicRequest,
  UpdateUserRequest,
} from "@/internal/user/interface";

export class UserRepository implements IUserRepository {
  updateUser({
    userId,
    userData,
  }: UpdateUserRequest): Promise<Partial<UserData>> {
    throw new Error("Method not implemented.");
  }
  updateProfilePicture({
    userId,
    imageUrl,
  }: UpdateProfilePicRequest): Promise<string> {
    throw new Error("Method not implemented.");
  }
  deleteUser(userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findUserByUsername(username: string): Promise<string | null> {
    throw new Error("Method not implemented.");
  }
  getAllUsers(): Promise<UserData[]> {
    throw new Error("Method not implemented.");
  }
}
