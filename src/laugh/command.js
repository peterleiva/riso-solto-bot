import { randomInt } from "crypto";
import createDebug from "debug";
import Laugh from "./laugh.js";

const debug = createDebug("command");

/**
 * Select one of laugh type randomly
 * @return {string}
 */
async function typePicker() {
  const types = await Laugh.find().distinct("__t").exec();
  debug("types found %o", types);

  const type = types?.[randomInt(0, Math.max(1, types.length))] ?? "Text";

  debug("type picked: '%s'", type);

  return type;
}

export async function command(ctx, Aggregation, creator) {
  const docs = await Aggregation.sample(1).exec();

  debug("docs found in aggregation: %o", docs);
  docs.forEach(doc => creator(doc).reply(ctx));
}

export async function laugh(ctx) {
  command(
    ctx,
    Laugh.aggregate().match({ __t: await typePicker() }),
    doc => new Laugh(doc)
  );
}
