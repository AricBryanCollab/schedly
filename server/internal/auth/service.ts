import {
  AuthorizationError,
  NotFoundError,
  ValidationError,
} from "@/infrastructure/errors/customErrors";
import { OAuthData, SignInData, SignUpData } from "@/internal/auth/dto";
import { IAuthResponse } from "@/internal/auth/interface";

import { AuthRepository } from "@/internal/auth/repository";

import { toHashPassword, validatePassword } from "@/utils/auth/bcrypt";
import { verifyToken } from "@/utils/auth/jwt";
import {
  UserInfo,
  handleGithubProvider,
  handleGoogleProvider,
} from "@/utils/auth/oauth";
import { sendOtpToEmail } from "@/utils/otp/sendOTP";

interface UserData {
  id: string;
  username: string;
  password: string | null;
}

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async signUp(signUpData: SignUpData): Promise<string> {
    const { username, email, password, confirmPassword } = signUpData;

    // Missing Fields Validation
    if (!username || !email || !password || !confirmPassword) {
      throw new ValidationError("All fields are required");
    }

    // Username validation
    const usernameRegex = /^[a-zA-Z0-9 ]{5,}$/;
    if (!usernameRegex.test(username)) {
      throw new ValidationError(
        "Username must be greater than 5 alphanumeric characters."
      );
    }

    // Email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ValidationError("Invalid email address");
    }

    // Password and confirmPassword Comparison
    if (password !== confirmPassword) {
      throw new ValidationError("Password doesn't match");
    }

    // Existing User Validation
    const existingUser = await this.authRepository.findUserByEmail(email);
    if (existingUser) {
      throw new ValidationError("Email already used, please try another");
    }

    //Password Hashing
    const hashedPassword = await toHashPassword(password);
    const validatedUser = {
      ...signUpData,
      password: hashedPassword,
    };

    const redisKey = await sendOtpToEmail(signUpData.email, validatedUser);

    return redisKey;
  }

  async signIn(signinData: SignInData) {
    const { email, password } = signinData;

    const user = await this.authRepository.findUserByEmail(email);

    if (!user || !user.password) {
      throw new NotFoundError("User account");
    }

    const isPasswordMatched = await validatePassword(password, user.password);

    if (!isPasswordMatched) {
      throw new Error("Invalid password. Please try again");
    }

    const userResData = {
      id: user.id,
      username: user.username,
    };

    return userResData;
  }

  async oAuthSignUp(provider: string, accessToken: string): Promise<string> {
    let userInfo: UserInfo<string>;
    switch (provider) {
      case "google":
        userInfo = await handleGoogleProvider(accessToken);
        break;

      case "github":
        userInfo = await handleGithubProvider(accessToken);
        break;

      default:
        throw new ValidationError(`Unsupported provider: ${provider}`);
    }

    const { email, username, profilePic } = userInfo;

    let user: IAuthResponse | null = null;
    if (provider === "google") {
      user = await this.authRepository.findUserByEmail(userInfo.email);
    } else {
      user = await this.authRepository.findUserByUsername(userInfo.username);
    }

    const validatedData: OAuthData = {
      email,
      username,
      profilePicURL: profilePic,
      provider: provider,
    };

    const redisKey = await sendOtpToEmail(email, validatedData);

    return redisKey;
  }

  async oAuthSignIn(provider: string, accessToken: string) {
    try {
      let userInfo: UserInfo<string>;
      switch (provider) {
        case "google":
          userInfo = await handleGoogleProvider(accessToken);
          break;
        case "github":
          userInfo = await handleGithubProvider(accessToken);
          break;
        default:
          throw new ValidationError(`Unsupported provider: ${provider}`);
      }

      let user: IAuthResponse | null;

      if (provider === "google") {
        user = await this.authRepository.findUserByEmail(userInfo.email);
      } else {
        user = await this.authRepository.findUserByUsername(userInfo.username);
      }

      if (!user) {
        throw new NotFoundError("No user found for this OAuth account");
      }

      return user;
    } catch (error) {}
  }

  async validateUserToken(token: string): Promise<UserData | null> {
    try {
      const decoded = verifyToken(token);

      const user = await this.authRepository.findUserByUserId(decoded.userId);
      if (user) {
        return {
          id: user.id,
          username: user.username,
          password: user.password || null,
        };
      }
      return null;
    } catch (error) {
      throw new AuthorizationError("Invalid or expired token");
    }
  }
}
