import { imageFactory } from "../factory/images.js";
import { randomInt } from "crypto";

const images = await imageFactory().create();

export function image(ctx) {
  const index = randomInt(0, images.length - 1);

  ctx.replyWithPhoto(images[index]);
}
