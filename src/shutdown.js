import chalk from "chalk";

export function shutdown(bot) {
  return signal => {
    console.log("\n", chalk.red(`Received ${signal} signal`));
    console.log("Application is shutting down");

    bot.stop(signal);
    process.exit(0);
  };
}
