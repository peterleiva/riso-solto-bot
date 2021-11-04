import Image from "./image.js";
import { command } from "#laugh";

export function image(ctx) {
  command(ctx, Image.aggregate(), doc => new Image(doc));
}

export function meme(ctx) {
  ctx.reply("vou ver te aviso");
}
