import { DatabaseError } from "@/infrastructure/errors/customErrors";
import { UserData } from "@/internal/user/dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { prisma } from "@/infrastructure/database/connectToDb";
import {
  IUserRepository,
  ProfilePic,
  UpdateProfilePicRequest,
  UpdateUserRequest,
  UserDataRepo,
} from "@/internal/user/interface";

export class UserRepository implements IUserRepository {
  async updateUser({
    userId,
    userData,
  }: UpdateUserRequest): Promise<Partial<UserData>> {
    try {
      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          username: userData.username,
          email: userData.email,
          timezone: userData.timezone,
        },
      });
      return user as UserData;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError("Database error at updateUser method");
      }
      throw error;
    }
  }

  async updateProfilePicture({
    userId,
    imageUrl,
  }: UpdateProfilePicRequest): Promise<string> {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          profilePic: imageUrl,
        },
      });
      return updatedUser.profilePic as string;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError(
          "Database error at updateProfilePicture method"
        );
      }
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      await prisma.user.delete({
        where: { id: userId },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError("Database error at deleteUser method");
      }
      throw error;
    }
  }
  async findUser(
    field: "email" | "username",
    value: string
  ): Promise<UserDataRepo | null> {
    try {
      let user: UserDataRepo | null = null;
      if (field === "email") {
        user = await prisma.user.findUnique({ where: { email: value } });
      } else if (field === "username") {
        user = await prisma.user.findUnique({ where: { username: value } });
      }

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError("Database error at findUser method");
      }
      throw error;
    }
  }

  async findUserProfilePic(userId: string): Promise<ProfilePic | null> {
    try {
      const profilePic = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          profilePic: true,
        },
      });

      return profilePic;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError("Database error at findUserProfilePic method");
      }
      throw error;
    }
  }
  getAllUsers(): Promise<UserData[]> {
    throw new Error("Method not implemented.");
  }
}
