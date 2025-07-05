import { redisClient } from "@/infrastructure/database/connectToRedis";
import { SignUpData } from "@/internal/auth/dto";

import { v4 as uuidv4 } from "uuid";

export const storeTemporaryUser = async (
  tempUser: SignUpData,
  expiry: number = 300
): Promise<string> => {
  if (!redisClient) throw new Error("Redis client not initialized");

  try {
    const key = uuidv4();
    redisClient.set(key, JSON.stringify(tempUser), { EX: expiry });

    return key;
  } catch (error) {
    throw new Error("Failed to store the temporary user data at Redis Storage");
  }
};
