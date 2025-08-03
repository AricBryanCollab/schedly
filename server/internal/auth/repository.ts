import { prisma } from "@/infrastructure/database/connectToDb";

import { DatabaseError } from "@/infrastructure/errors/customErrors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { SignUpData } from "@/internal/auth/dto";
import { IAuthRepository, IAuthResponse } from "@/internal/auth/interface";

export const defaultProfilePic =
  "https://res.cloudinary.com/dpmecjee7/image/upload/v1750701689/default_profilepic_lm3qvo.jpg";

export class AuthRepository implements IAuthRepository {
  async createUser(signUpData: SignUpData): Promise<IAuthResponse> {
    try {
      const result = await prisma.$transaction(async (tx) => {
        const createdUser = await tx.user.create({
          data: {
            username: signUpData.username,
            email: signUpData.email,
            password: signUpData.password,
            profilePic: signUpData.profilePicURL || defaultProfilePic,
          },
        });

        let createdOAuth: { provider: string } | null = null;

        if (signUpData.provider && signUpData.providerAccountId) {
          createdOAuth = await tx.oAuthAccount.create({
            data: {
              userId: createdUser.id,
              provider: signUpData.provider,
              providerAccountId: signUpData.providerAccountId,
            },
          });
        }

        const newUser: IAuthResponse = {
          id: createdUser.id,
          username: createdUser.username,
          provider: createdOAuth?.provider || null,
        };

        return newUser;
      });

      return result;
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
