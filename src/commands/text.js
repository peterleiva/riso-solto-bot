import createDebug from "debug";
import { Text as TextModel } from "../models/index.js";
import numberParser from "../number-parser.js";
import { multiplier } from "../utils/index.js";

const debug = createDebug("command:text");

export async function reply(ctx, match) {
  const result = await TextModel.aggregate().match(match).sample(1).exec();

  debug("aggregation result: %O", result);

  result.map(text => {
    ctx.reply(multiplier(text.token, numberParser(ctx.message.text)));
  });
}

export function text(ctx) {
  reply(ctx, {
    tags: {
      $nin: ["emoji"],
    },
  });
}
