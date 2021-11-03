import { reply } from "./text.js";

export async function emoji(ctx) {
  reply(ctx, { tags: { $in: ["emoji"] } });
}
