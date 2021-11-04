import { EventEmitter } from "events";
import { laugh } from "./commands/index.js";

function isMention(ctx) {
  return ctx.message.entities?.some(entity => entity.type === "mention");
}

function isPrivate(ctx) {
  return ctx.chat.type === "private";
}

export function Bot() {
  const event = new EventEmitter();

  event.on("mention", laugh);

  return async function middleware(ctx, next) {
    if (isMention(ctx)) {
      event.emit("mention", ctx);
    }

    if (isPrivate(ctx)) event.emit("private", ctx);

    await next();
  };
}
