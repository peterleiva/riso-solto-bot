import Photo from "./photo.js";
import { command } from "#laugh";

export function image(ctx) {
  command(ctx, Photo.aggregate(), doc => new Photo(doc));
}

export function meme(ctx) {
  ctx.reply("vou ver te aviso");
}
