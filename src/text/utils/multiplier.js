import { randomInt } from "crypto";

export function multiplier(
  token,
  times = 1,
  delimit = "",
  limit = randomInt(10, 200)
) {
  if (isNaN(times) || times <= 0) {
    times = 1;
  }

  limit = Math.min(limit, 5_000);
  times = Math.min(times, limit);

  return new Array(times).fill(token).join(delimit);
}
