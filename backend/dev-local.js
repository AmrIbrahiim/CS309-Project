// Local development entry point: starts the API with a real local MongoDB.
// Data is stored in backend/.data/mongodb and survives restarts.
// Use "npm start" instead when you want to connect to MongoDB Atlas via backend/.env.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

import User from "./models/User.js";
import { DEMO_USERS } from "./data/demoUsers.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, ".data", "mongodb");

fs.mkdirSync(dbPath, { recursive: true });

// Reuse an already-downloaded mongod binary instead of downloading it again.
const binaryCache = path.join(__dirname, "node_modules", ".cache", "mongodb-memory-server");
if (fs.existsSync(binaryCache)) {
  const cachedBinary = fs
    .readdirSync(binaryCache)
    .find((file) => /^mongod-.*\.exe$/i.test(file));
  if (cachedBinary) {
    process.env.MONGOMS_SYSTEM_BINARY = path.join(binaryCache, cachedBinary);
  }
}

console.log("Starting local MongoDB...");
const mongo = await MongoMemoryServer.create({
  instance: {
    dbPath,
    storageEngine: "wiredTiger"
  }
});

process.env.MONGODB_URI = mongo.getUri("unitrade");
console.log(`Local MongoDB ready. Data directory: ${dbPath}`);

// server.js reads MONGODB_URI from the environment, so it connects to the local DB.
await import("./server.js");

await mongoose.connection.asPromise();

if ((await User.countDocuments()) === 0) {
  await User.insertMany(DEMO_USERS);
  console.log(`Seeded ${DEMO_USERS.length} demo accounts.`);
}

const shutdown = async () => {
  try {
    await mongoose.disconnect();
  } catch {
    // ignore shutdown errors
  }
  try {
    await mongo.stop({ doCleanup: false });
  } catch {
    // ignore shutdown errors
  }
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
