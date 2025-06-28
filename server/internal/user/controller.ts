import { UserService } from "@/internal/user/service";
import { NextFunction, Request, Response } from "express";
export class UserController {
  constructor(private readonly userService: UserService) {
    this.updateUser = this.updateUser.bind(this);
    this.updateUserProfilePic = this.updateUserProfilePic.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async updateUserProfilePic(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(_: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
}
