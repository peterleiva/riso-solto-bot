import createDebug from "debug";
import Laugh from "./laugh.js";

const debug = createDebug("command");

export async function command(ctx, Aggregation, creator) {
  const docs = await Aggregation.sample(1).exec();

  debug("docs found in aggregation: %o", docs);
  docs.forEach(doc => creator(doc).reply(ctx));
}

export function laugh(ctx) {
  command(ctx, Laugh.aggregate(), doc => new Laugh(doc));
}
