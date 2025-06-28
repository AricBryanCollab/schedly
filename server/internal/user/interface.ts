import { UserData } from "@/internal/user/dto";

export interface IUserRepository {
  updateUser({
    userId,
    userData,
  }: UpdateUserRequest): Promise<Partial<UserData>>;
  updateProfilePicture({
    userId,
    imageUrl,
  }: UpdateProfilePicRequest): Promise<string>;
  deleteUser(userId: string): Promise<void>;
  findUserByUsername(username: string): Promise<string | null>;
  getAllUsers(): Promise<UserData[]>;
}

export interface UpdateUserRequest {
  userId: string;
  userData: UserData;
}

export interface UpdateProfilePicRequest {
  userId: string;
  imageUrl: string;
}
