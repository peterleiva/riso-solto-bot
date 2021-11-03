import LaughManager from "./laugh-manager.js";
import { EventEmitter } from "events";

function isMention(ctx) {
  return ctx.message.entities?.some(entity => entity.type === "mention");
}

function isPrivate(ctx) {
  return ctx.chat.type === "private";
}

export function Bot() {
  const manager = new LaughManager();
  const event = new EventEmitter();

  event.on("message", reply);

  async function reply(ctx) {
    if (manager.empty()) {
      await manager.generate();
    }

    const laugh = manager.pick();
    laugh.reply(ctx);
  }

  return async function middleware(ctx, next) {
    if (isMention(ctx)) {
      event.emit("message", ctx);
    }

    await next();
  };
}
