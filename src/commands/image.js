import { Photo } from "../models/index.js";
import { command } from "#laugh";

export function image(ctx) {
  command(ctx, Photo.aggregate(), doc => new Photo(doc));
}
