import { AuthService } from "@/internal/auth/service";
import { NextFunction, Request, Response } from "express";

import { ValidationError } from "@/infrastructure/errors/customErrors";
import { generateTokenAndSetCookie } from "@/utils/auth/jwt";

export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.oAuthSignUp = this.oAuthSignUp.bind(this);
    this.oAuthSignIn = this.oAuthSignIn.bind(this);
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
      const signInData = req.body;

      const userResData = await this.authService.signIn(signInData);

      generateTokenAndSetCookie(userResData.id, req, res);
      res.status(200).json({
        message: "You have successfully signed in",
        user: userResData,
      });
    } catch (error) {
      next(error);
    }
  }

  async signOut(_: Request, res: Response, next: NextFunction) {
    try {
      res.cookie("jwt", "", { maxAge: 0 });
      res
        .status(200)
        .json({ message: "You have been logged out successfully" });
    } catch (error) {
      next(error);
    }
  }

  async oAuthSignUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { provider } = req.params;
      const { accessToken } = req.body;

      if (!accessToken) {
        throw new ValidationError("Access Token is required");
      }

      const userResData = await this.authService.oAuthSignUp(
        provider,
        accessToken
      );
      if (!userResData) {
        throw new Error("Failed to perform OAuth protocol");
      }

      generateTokenAndSetCookie(userResData.id, req, res);
      res.status(200).json({
        message: "You have successfully signed in",
        user: userResData,
      });
    } catch (error) {
      next(error);
    }
  }

  async oAuthSignIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { provider } = req.params;
      const { accessToken } = req.body;

      if (!accessToken) {
        throw new ValidationError("Access token is required");
      }

      const userResData = await this.authService.oAuthSignIn(
        provider,
        accessToken
      );
      if (!userResData) {
        throw new Error("No user found for this OAuth account");
      }

      generateTokenAndSetCookie(userResData.id, req, res);
      res.status(200).json({
        message: "You have successfully signed in",
        user: userResData,
      });
    } catch (error) {
      next(error);
    }
  }
}
