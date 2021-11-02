import { readFile } from "fs/promises";
import { randomInt } from "crypto";
import { getImage } from "./sstk.js";

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

async function searchPhotos() {
  const results = await getImage();

  return results.map(asset => ({
    type: "photo",
    text: asset.huge_thumb.url,
  }));
}

function isMention(ctx) {
  return ctx.message.entities?.some(entity => entity.type === "mention");
}

function isPrivate(ctx) {
  return ctx.chat.type === "private";
}

export async function reply(id) {
  const ctx = chats.get(id);

  if (unusedLaughs.length <= 0) {
    const photos = await searchPhotos();
    unusedLaughs.push(...dataset, ...photos);
  }

  const lastIndex = unusedLaughs.length - 1;
  const laughIndex = lastIndex === 0 ? 0 : randomInt(0, lastIndex);
  let laugh = unusedLaughs.splice(laughIndex, 1)?.[0];

  if (laugh.type && laugh.type === "photo") {
    return ctx.replyWithPhoto(laugh.text);
  }

  let text = laugh.text;
  const matched = ctx?.message?.text?.match(/\d+/);
  const times = Number(matched?.[0]);

  if (!isNaN(times)) {
    const max = Math.min(randomInt(10, 254), Math.max(1, times));
    text = new Array(max).fill(text).join("");
  }

  ctx.reply(text);
}

export async function interactionHandler(ctx, next) {
  const chatId = ctx.chat.id;

  chats.set(chatId, ctx);

  if (isPrivate(ctx) || isMention(ctx)) {
    await reply(chatId);
  }

  await next();
}
