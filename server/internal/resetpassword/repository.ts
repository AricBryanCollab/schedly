import { DatabaseError } from "@/infrastructure/errors/customErrors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { IResetPasswordRepository } from "@/internal/resetpassword/interface";
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
}
