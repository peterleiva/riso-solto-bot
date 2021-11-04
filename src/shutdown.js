import chalk from "chalk";
import { database } from "./utils/index.js";

export function shutdown(bot) {
  return async signal => {
    const reason = `Received ${signal} signal`;
    console.log("\n%s", chalk.red(reason));

    bot.stop(signal);
    console.log("Bot stopped.");

    await database.disconnect();

    setImmediate(() => process.kill(process.pid, signal));
  };
}
