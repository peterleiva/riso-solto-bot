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

  event.on("message", laugh);

  return async function middleware(ctx, next) {
    if (isMention(ctx)) {
      event.emit("message", ctx);
    }

    await next();
  };
}
