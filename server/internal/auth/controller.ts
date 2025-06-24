import { AuthService } from "@/internal/auth/service";
import { NextFunction, Request, Response } from "express";

import { generateTokenAndSetCookie } from "@/utils/auth/jwt";

export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.oAuth = this.oAuth.bind(this);
  }

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const signUpData = req.body;

      const userResData = await this.authService.signUp(signUpData);

      generateTokenAndSetCookie(userResData.id, req, res);

      res.status(201).json({
        message: "Congratulations, your account has been registered",
        user: userResData,
      });
    } catch (error) {
      next(error);
    }
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json("Sign In Endpoint");
    } catch (error) {
      next(error);
    }
  }
  async signOut(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json("Sign Out Endpoint");
    } catch (error) {
      next(error);
    }
  }
  async oAuth(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json("OAuth Endpoint");
    } catch (error) {
      next(error);
    }
  }
}
