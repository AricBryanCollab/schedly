import { prisma } from "@/infrastructure/database/connectToDb";

import { DatabaseError } from "@/infrastructure/errors/customErrors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { OAuthData, SignUpData } from "@/internal/auth/dto";
import { IAuthRepository, IAuthResponse } from "@/internal/auth/interface";

export const defaultProfilePic =
  "https://res.cloudinary.com/dpmecjee7/image/upload/v1750701689/default_profilepic_lm3qvo.jpg";

export class AuthRepository implements IAuthRepository {
  async createUser(signUpData: SignUpData | OAuthData): Promise<IAuthResponse> {
    try {
      const newUser = await prisma.user.create({
        data: {
          username: signUpData.username,
          email: signUpData.email,
          password:
            "password" in signUpData && signUpData.password !== undefined
              ? signUpData.password
              : null,
          profilePic: signUpData.profilePicURL || defaultProfilePic,
          provider:
            "provider" in signUpData && signUpData.provider !== undefined
              ? signUpData.provider
              : null,
        },
      });

      return newUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError("Database error at createUser method");
      }
      throw error;
    }
  }
  async findUserByEmail(email: string): Promise<IAuthResponse | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          username: true,
          password: true,
        },
      });

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        username: user.username,
        password: user.password ?? null,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError("Database error at findUserByEmail method");
      }
      throw error;
    }
  }

  async findUserByUsername(username: string): Promise<IAuthResponse | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { username },
        select: {
          id: true,
          username: true,
          password: true,
        },
      });

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        username: user.username,
        password: user.password ?? null,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError("Database error at findUserByUsername method");
      }
      throw error;
    }
  }

  async findUserByUserId(userId: string): Promise<IAuthResponse | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          username: true,
          password: true,
        },
      });

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        username: user.username,
        password: user.password ?? null,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError("Database error at findUserByUserId method");
      }
      throw error;
    }
  }
}
