#!/usr/bin/env node

import { launcher } from "./launcher.js";

try {
  await launcher();
  console.log("Telegram bot is running");
} catch {
  console.error("Error starting the bot");
  process.exit(1);
}
