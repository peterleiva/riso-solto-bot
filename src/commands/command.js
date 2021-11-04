import createDebug from "debug";
const debug = createDebug("command");

export async function command(ctx, Aggregation, creator) {
  const docs = await Aggregation.sample(1).exec();

  debug("docs found in aggregation: %o", docs);
  docs.forEach(doc => creator(doc).reply(ctx));
}
