import { readFile } from "fs/promises";
import { randomInt } from "crypto";

let dataset;

try {
  const file = await readFile("src/dataset.json", "utf-8");
  dataset = JSON.parse(file);
} catch (error) {
  console.error("Coulnd't load src/dataset");
  console.error(error);
}

const chats = new Map();

function isMention(ctx) {
  return ctx.message.entities?.some(entity => entity.type === "mention");
}

function isPrivate(ctx) {
  return ctx.chat.type === "private";
}

export function reply(id) {
  const { ctx, laughs } = chats.get(id);

  if (laughs.length <= 0) {
    laughs.push(...dataset);
  }

  const lastIndex = laughs.length - 1;
  const laughIndex = lastIndex === 0 ? 0 : randomInt(0, lastIndex);
  const laugh = laughs.splice(laughIndex, 1)?.[0]?.text ?? "kkkk";

  ctx.reply(laugh);
}

export async function interactionHandler(ctx, next) {
  const chatId = ctx.chat.id;

  if (isPrivate(ctx) || isMention(ctx)) {
    chats.set(chatId, { ctx });
    reply(chatId);
  }

  await next();
}
