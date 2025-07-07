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

export interface UserDataRepo {
  username: string;
  email: string | null;
  timezone: string | null;
}
