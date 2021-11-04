import { Laugh } from "../models/index.js";
import { command } from "./command.js";

export function laugh(ctx) {
  command(ctx, Laugh.aggregate(), doc => new Laugh(doc));
}
