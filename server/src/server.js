import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const DEFAULT_PORT = Number(process.env.PORT) || 5000;
const MAX_PORT_RETRIES = 10;

const listenWithFallback = (startPort) =>
  new Promise((resolve, reject) => {
    let attempts = 0;

    const tryPort = (port) => {
      const server = app.listen(port, () => {
        console.log(`Server running on port ${port}`);
        resolve(server);
      });

      server.once("error", (error) => {
        if (error.code === "EADDRINUSE" && attempts < MAX_PORT_RETRIES) {
          attempts += 1;
          const nextPort = port + 1;
          console.warn(`Port ${port} is busy, trying ${nextPort}...`);
          tryPort(nextPort);
          return;
        }
        reject(error);
      });
    };

    tryPort(startPort);
  });

const startServer = async () => {
  try {
    await connectDB();
    await listenWithFallback(DEFAULT_PORT);
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
