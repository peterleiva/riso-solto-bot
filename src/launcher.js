import { Telegraf } from "telegraf";
import { env, database } from "./utils/index.js";
import { shutdown } from "./shutdown.js";
import { Bot } from "./bot.js";
import {
  text,
  helper,
  emoji,
  image,
  laugh,
  meme,
  joke,
} from "./commands/index.js";

function gracefullyStop(bot) {
  const signals = ["SIGINT", "SIGTERM"];
  const stopper = shutdown(bot);

  signals.forEach(signal => {
    process.once(signal, () => stopper(signal));
  });
}

export async function launcher() {
  const BOT_TOKEN = env.telegram.token;
  const bot = new Telegraf(BOT_TOKEN);

  bot.on("message", Bot());

  await database.connect();
  await bot.launch();

  gracefullyStop(bot);

  bot.command("start", helper);
  bot.command("laugh", laugh);
  bot.command("text", text);
  bot.command("joke", joke);
  bot.command("meme", meme);
  bot.command("emoji", emoji);
  bot.command("image", image);
  bot.command("help", helper);
}
