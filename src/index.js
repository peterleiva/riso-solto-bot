#!/usr/bin/env node

import { launcher } from "./launcher.js";

try {
  await launcher();
  console.log("Telegram bot is running");
} catch (error) {
  console.error("Error starting the bot");
  console.error(error);
  process.exit(1);
}
