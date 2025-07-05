import { loadEnv } from "@/config/loadEnv";
import { connectToDb } from "@/infrastructure/database/connectToDb";
import { startApp } from "@/infrastructure/express/app";
import { connectToRedis } from "./infrastructure/database/connectToRedis";

const initializeServer = async () => {
  try {
    loadEnv();

    await connectToDb();

    await connectToRedis();

    const app = startApp();

    const port = parseInt(process.env.PORT || "3000");

    app.listen(port, "0.0.0.0", () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server", error);
    process.exit(1);
  }
};

initializeServer();
