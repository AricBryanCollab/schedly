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

export const retrieveRedisData = async (key: string) => {
  try {
    if (!redisClient) throw new Error("Redis client not initialized");
    const data = await redisClient.get(key);
    if (!data) return null;

    const { user, otp: storedOtp } = JSON.parse(data);

    return { user, storedOtp };
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
