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
      const userId = req.params.id;
      const userData = req.body;

      const updateUserRes = await this.userService.updateUser({
        userId,
        userData,
      });

      res.status(200).json({
        message: "You have successfulyy update your profile",
        user: updateUserRes,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUserProfilePic(req: Request, res: Response, next: NextFunction) {
    try {
      const { file } = req;
      const userId = req.params.id;

      if (!file) {
        res.status(400).json({ message: "No file uploaded" });
        return;
      }

      const profPicUrl = await this.userService.updateProfilePicture(
        userId,
        file
      );

      res.status(200).json({
        message: "Profile picture has been updated",
        profilePic: profPicUrl,
      });
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
