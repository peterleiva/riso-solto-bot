import LaughManager from "./laugh-manager.js";

const chats = new Map();
const manager = new LaughManager();

function isMention(ctx) {
  return ctx.message.entities?.some(entity => entity.type === "mention");
}

function isPrivate(ctx) {
  return ctx.chat.type === "private";
}

export async function reply(id) {
  const ctx = chats.get(id);

  if (manager.empty()) {
    await manager.generate();
  }

  const laugh = manager.pick();
  laugh.reply(ctx);
}

export async function interactionHandler(ctx, next) {
  const chatId = ctx.chat.id;

  chats.set(chatId, ctx);

  if (isPrivate(ctx) || isMention(ctx)) {
    await reply(chatId);
  }

  await next();
}
