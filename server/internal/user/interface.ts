import { UserData } from "@/internal/user/dto";
import type { User } from "@prisma/client";

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
  findUser(field: "email" | "username", value: string): Promise<User | null>;
  findUserProfilePic(userId: string): Promise<ProfilePic | null>;
  getAllUsers(): Promise<UserListItem[]>;
}

export type FileInput = { path: string };

export interface UpdateUserRequest {
  userId: string;
  userData: UserData;
}

export interface UpdateProfilePicRequest {
  userId: string;
  imageUrl: string;
}

export interface ProfilePic {
  profilePic: string | null;
}

export interface UserListItem {
  username: string;
  email?: string | null;
  profilePic?: string | null;
  timezone?: string | null;
}
