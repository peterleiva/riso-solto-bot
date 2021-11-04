import TextModel from "./text.js";
import { command } from "#laugh";

function reply(ctx, match) {
  command(ctx, TextModel.aggregate().match(match), doc => new TextModel(doc));
}

export function text(ctx) {
  reply(ctx, {
    tags: {
      $nin: ["emoji"],
    },
  });
}

export function emoji(ctx) {
  reply(ctx, { tags: { $in: ["emoji"] } });
}
