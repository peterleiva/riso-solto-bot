import { request } from "https";
import concat from "concat-stream";

const DAD_JOKE_URL = "https://icanhazdadjoke.com";

/**
 * Getter for random joke
 *
 * @return {Promise<string>}
 */
export async function getRandomJoke() {
  return new Promise((resolve, reject) => {
    const req = request(DAD_JOKE_URL, {
      headers: {
        Accept: "application/json",
        "User-Agent": "RisoSoltoBot bot @risosoltobot for telegram",
      },
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
