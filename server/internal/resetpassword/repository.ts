import { prisma } from "@/infrastructure/database/connectToDb";
import {
  DatabaseError,
  ValidationError,
} from "@/infrastructure/errors/customErrors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import {
  IResetPasswordRepository,
  UserData,
} from "@/internal/resetpassword/interface";

export class ResetPasswordRepository implements IResetPasswordRepository {
  async updatePassword(email: string, hashedPassword: string): Promise<void> {
    try {
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError("Database error at updatePassword method");
      }
      throw error;
    }
  }

  async findUserByEmail(email: string): Promise<UserData | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new ValidationError("User was not found in the database");
      }

      const existingUser = {
        username: user.username,
        email: user.email,
        provider: user.provider,
      };

      return existingUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError("Database error at findUserByEmail method");
      }
      throw error;
    }
  }
}
