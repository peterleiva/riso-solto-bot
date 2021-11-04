import { request } from "https";
import concat from "concat-stream";

const DAD_JOKE_URL = "https://icanhazdadjoke.com";

async function getJoke() {
  return new Promise((resolve, reject) => {
    const req = request(DAD_JOKE_URL, {
      headers: { Accept: "application/json" },
    });

    req.on("response", res => {
      try {
        res.pipe(
          concat(body => {
            const { joke, status } = JSON.parse(body);
            status === 200 ? resolve(joke) : reject(body);
          })
        );
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", reject);
    req.end();
  });
}

export async function joke(ctx) {
  const joke = await getJoke();

  ctx.reply(joke);
}
