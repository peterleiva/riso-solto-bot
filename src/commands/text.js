import { randomInt } from "crypto";
import createDebug from "debug";
import { Text as TextModel } from "../models/index.js";
import numberParser from "../number-parser.js";

const debug = createDebug("command:text");

export class TextCommand {
  async reply(ctx) {
    const result = await TextModel.aggregate(this.buildPipeline()).exec();

    const [{ token }] = result;

    debug("token found", token);
    debug("aggregation result", result);

    ctx.reply(this.multiplier(token, numberParser(ctx.message.text)));
  }

  multiplier(token, times = 1, limit = randomInt(10, 200)) {
    if (isNaN(times) || times <= 0) {
      times = 1;
    }

    limit = Math.min(limit, 5_000);
    times = Math.min(times, limit);

    return new Array(times).fill(token).join("");
  }

  buildMatch() {
    return {
      tags: {
        $nin: ["emoji"],
      },
    };
  }

  buildPipeline() {
    return [
      {
        $match: this.buildMatch(),
      },
      {
        $sample: {
          size: 1,
        },
      },
    ];
  }
}

export async function text(ctx) {
  const commander = new TextCommand();
  commander.reply(ctx);
}
