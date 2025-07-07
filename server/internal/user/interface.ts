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
  findUser(
    field: "email" | "username",
    value: string
  ): Promise<UserDataRepo | null>;
  findUserProfilePic(userId: string): Promise<ProfilePic | null>;
  getAllUsers(): Promise<UserData[]>;
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

export interface UserDataRepo {
  username: string;
  email: string | null;
  timezone: string | null;
}

export interface ProfilePic {
  profilePic: string | null;
}
