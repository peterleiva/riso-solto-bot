#!/usr/bin/env node

import config from "./env.js";
import { Telegraf } from "telegraf";
import { shutdown } from "./shutdown.js";
import { interactionHandler } from "./riso-solto.js";
import "./bin/www.cjs";

const BOT_TOKEN = config.telegram.token;
const bot = new Telegraf(BOT_TOKEN);

try {
  await bot.launch();
  console.log("Telegram bot is running");
} catch {
  console.error("Error starting the bot");
  process.exit(1);
}

bot.on("message", interactionHandler);

const signals = ["SIGINT", "SIGTERM"];
const gracefullyShutdown = shutdown(bot);

signals.forEach(signal => {
  process.once(signal, () => gracefullyShutdown(signal));
});
