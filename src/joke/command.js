import { getRandomJoke } from "./icanhazdadjoke.js";

export async function joke(ctx) {
  const joke = await getRandomJoke();

  ctx.reply(joke);
}
