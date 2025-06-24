import { prisma } from "@/infrastructure/database/connectToDb";

import { DatabaseError } from "@/infrastructure/errors/customErrors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { SignUpData } from "@/internal/auth/dto";
import { IAuthRepository, IAuthResponse } from "@/internal/auth/interface";

const defaultProfilePic =
  "https://res.cloudinary.com/dpmecjee7/image/upload/v1750701689/default_profilepic_lm3qvo.jpg";

export class AuthRepository implements IAuthRepository {
  async createUser(signUpData: SignUpData): Promise<IAuthResponse> {
    try {
      const newUser = await prisma.user.create({
        data: {
          username: signUpData.username,
          email: signUpData.email,
          password: signUpData.password,
          profilePic: signUpData.profilePicURL || defaultProfilePic,
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
  async findByEmail(email: string): Promise<IAuthResponse | null> {
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

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError("Database error at findByEmail method");
      }
      throw error;
    }
  }
  findByUserId(userId: string): Promise<IAuthResponse | null> {
    throw new Error("Method not implemented.");
  }
}
