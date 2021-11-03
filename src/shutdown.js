import chalk from "chalk";

export function shutdown(bot) {
  return signal => {
    const reason = `Received ${signal} signal`;
    console.log("\n%s", chalk.red(reason));

    bot.stop(signal);
    console.log("Bot stopped.");

    setImmediate(() => process.kill(process.pid, signal));
  };
}
