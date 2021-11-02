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

const unusedLaughs = [];

const chats = new Map();

function isMention(ctx) {
  return ctx.message.entities?.some(entity => entity.type === "mention");
}

function isPrivate(ctx) {
  return ctx.chat.type === "private";
}

export function reply(id) {
  const ctx = chats.get(id);

  if (unusedLaughs.length <= 0) {
    unusedLaughs.push(...dataset);
  }

  const lastIndex = unusedLaughs.length - 1;
  const laughIndex = lastIndex === 0 ? 0 : randomInt(0, lastIndex);
  let laugh = unusedLaughs.splice(laughIndex, 1)?.[0]?.text ?? "kkkk";

  let text = laugh;

  let [matched] = ctx?.message?.text?.match(/\d+/) ?? [1];

  const times = Number(matched ?? 1);

  if (!isNaN(matched)) {
    text = "";
    let i = 0;
    const max = Math.min(randomInt(10, 254), Math.max(1, times));

    while (i < max) {
      text += laugh;
      i++;
    }
  }

  ctx.reply(text);
}

export async function interactionHandler(ctx, next) {
  const chatId = ctx.chat.id;

  chats.set(chatId, ctx);

  if (isPrivate(ctx) || isMention(ctx)) {
    reply(chatId);
  }

  await next();
}
