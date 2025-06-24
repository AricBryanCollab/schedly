import {
  NotFoundError,
  ValidationError,
} from "@/infrastructure/errors/customErrors";
import { SignInData, SignUpData } from "@/internal/auth/dto";
import { IAuthResponse } from "@/internal/auth/interface";

import { AuthRepository } from "@/internal/auth/repository";
import { toHashPassword, validatePassword } from "@/utils/auth/bcrypt";

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
    const existingUser = await this.authRepository.findByEmail(email);
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

    const user = await this.authRepository.findByEmail(email);

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

  async oAuth() {}
}
