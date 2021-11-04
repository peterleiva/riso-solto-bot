import config from "./env.js";
import { Telegraf } from "telegraf";
import { shutdown } from "./shutdown.js";
import { Bot } from "./bot.js";
import { text, helper, emoji, image, laugh } from "./commands/index.js";

function gracefullyStop(bot) {
  const signals = ["SIGINT", "SIGTERM"];
  const stopper = shutdown(bot);

  signals.forEach(signal => {
    process.once(signal, () => stopper(signal));
  });
}

export async function launcher() {
  const BOT_TOKEN = config.telegram.token;
  const bot = new Telegraf(BOT_TOKEN);

  await bot.launch();
  gracefullyStop(bot);

  bot.on("message", Bot());

  bot.command("start", helper);
  bot.command("laugh", laugh);
  bot.command("text", text);
  bot.command("emoji", emoji);
  bot.command("image", image);
  bot.command("help", helper);
}
