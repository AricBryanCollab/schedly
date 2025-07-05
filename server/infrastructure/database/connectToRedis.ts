import { createClient, RedisClientType } from "redis";

export let redisClient: RedisClientType | null = null;

export const connectToRedis = async (): Promise<void> => {
  redisClient = createClient({
    url: process.env.REDIS_URL,
  });

  try {
    await redisClient.connect();
    console.log("redis is connected successfully");
  } catch (error) {
    console.error("Failed to connect to Redis:\n", error);
    process.exit(1);
  }
};
