#!/usr/bin/env node

import { launcher } from "./launcher.js";
import { database as db } from "./utils/index.js";

console.log(db);

try {
  await db.connect();
  await launcher();
  console.log("Telegram bot is running");
} catch (error) {
  console.error("Error starting the bot");
  console.error(error);
  process.exit(1);
}
