import { Text as TextModel } from "../models/index.js";
import { command } from "#laugh";

export async function reply(ctx, match) {
  command(ctx, TextModel.aggregate().match(match), doc => new TextModel(doc));
}

export function text(ctx) {
  reply(ctx, {
    tags: {
      $nin: ["emoji"],
    },
  });
}
