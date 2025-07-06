import { redisClient } from "@/infrastructure/database/connectToRedis";
import { OAuthData, SignUpData } from "@/internal/auth/dto";

import { v4 as uuidv4 } from "uuid";

export const storeTemporaryUser = async (
  tempUser: SignUpData | OAuthData,
  otp: string,
  expiry: number = 300
): Promise<string> => {
  if (!redisClient) throw new Error("Redis client not initialized");

  try {
    const key = uuidv4();
    const value = JSON.stringify({ user: tempUser, otp: otp });
    redisClient.set(key, value, { EX: expiry });

    return key;
  } catch (error) {
    throw new Error("Failed to store the temporary user data at Redis Storage");
  }
};

export const storePasswordResetOTP = async (
  email: string,
  otp: string,
  expiry: number = 300
): Promise<string> => {
  if (!redisClient) throw new Error("Redis client not initialized");

  try {
    const key = uuidv4();
    const value = JSON.stringify({ email: email, otp: otp });
    redisClient.set(key, value, { EX: expiry });

    return key;
  } catch (error) {
    throw new Error("Failed to store the password reset OTP at Redis Storage");
  }
};

export const retrieveRedisData = async (
  key: string,
  feature: "oauth" | "reset-password"
) => {
  try {
    if (!redisClient) throw new Error("Redis client not initialized");
    const data = await redisClient.get(key);
    if (!data) return null;

    const parsedData = JSON.parse(data);
    if (feature == "oauth") {
      return { user: parsedData.user, storedOtp: parsedData.otp };
    } else if (feature == "reset-password") {
      return { email: parsedData.email, storedOtp: parsedData.otp };
    }
  } catch (error) {
    throw new Error("Failed to get the stored redis data");
  }
};

export const deleteStoredData = async (key: string) => {
  try {
    if (!redisClient) throw new Error("Redis client not initialized");

    await redisClient.del(key);

    return;
  } catch (error) {
    throw new Error("Failed to get the delete the stored redis data");
  }
};
