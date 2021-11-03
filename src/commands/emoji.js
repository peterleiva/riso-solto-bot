import { TextCommand } from "./text.js";

class EmojiCommand extends TextCommand {
  buildMatch() {
    return {
      tags: {
        $in: ["emoji"],
      },
    };
  }
}

export async function emoji(ctx) {
  const commander = new EmojiCommand();
  commander.reply(ctx);
}
