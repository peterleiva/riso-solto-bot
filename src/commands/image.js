import { Photo } from "../models/index.js";
import { command } from "./command.js";

export function image(ctx) {
  command(ctx, Photo.aggregate(), doc => new Photo(doc));
}
