import {
  NotFoundError,
  ValidationError,
} from "@/infrastructure/errors/customErrors";
import { OAuthData, SignInData, SignUpData } from "@/internal/auth/dto";
import { IAuthResponse } from "@/internal/auth/interface";

import { AuthRepository } from "@/internal/auth/repository";
import { toHashPassword, validatePassword } from "@/utils/auth/bcrypt";
import {
  UserInfo,
  handleFacebookProvider,
  handleGoogleProvider,
} from "@/utils/auth/oauth";

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async signUp(signUpData: SignUpData): Promise<IAuthResponse> {
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
    const newUser = await this.authRepository.createUser({
      ...signUpData,
      password: hashedPassword,
      profilePicURL: "",
    });

    const userResData = {
      id: newUser.id,
      username: newUser.username,
    };

    return userResData;
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

  async oAuthSignUp(
    provider: string,
    accessToken: string
  ): Promise<IAuthResponse> {
    let userInfo: UserInfo<string>;
    switch (provider) {
      case "google":
        userInfo = await handleGoogleProvider(accessToken);
        break;

      case "facebook":
        userInfo = await handleFacebookProvider(accessToken);
        break;

      default:
        throw new ValidationError(`Unsupported provider: ${provider}`);
    }

    const { email, username, profilePic } = userInfo;

    let user: IAuthResponse | null = null;
    if (provider === "google") {
      user = await this.authRepository.findByEmail(userInfo.email);
    } else {
      user = await this.authRepository.findUserByUsername(userInfo.username);
    }

    if (!user) {
      const signUpData: OAuthData = {
        email,
        username,
        profilePicURL: profilePic,
        provider: provider,
      };

      user = await this.authRepository.createUser(signUpData);
    }

    return user;
  }

  async oAuthSignIn(provider: string, accessToken: string) {
    try {
      let userInfo: UserInfo<string>;
      switch (provider) {
        case "google":
          userInfo = await handleGoogleProvider(accessToken);
          break;
        case "facebook":
          userInfo = await handleFacebookProvider(accessToken);
          break;
        default:
          throw new ValidationError(`Unsupported provider: ${provider}`);
      }

      let user: IAuthResponse | null;

      if (provider === "google") {
        user = await this.authRepository.findByEmail(userInfo.email);
      } else {
        user = await this.authRepository.findUserByUsername(userInfo.username);
      }

      if (!user) {
        throw new NotFoundError("No user found for this OAuth account");
      }

      return user;
    } catch (error) {}
  }
}
