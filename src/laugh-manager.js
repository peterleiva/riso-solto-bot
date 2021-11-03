import { randomInt } from "crypto";
import { messageFactory, imageFactory } from "./factory/index.js";

export default class LaughManager {
  constructor() {
    this.factories = [messageFactory(), imageFactory()];
    this.cache = [];
  }

  get laughs() {
    return this.cache;
  }

  async generate() {
    const results = await Promise.all(this.factories.map(f => f.create()));
    this.cache.push(...[].concat(...results));

    return this.cache;
  }

  pick() {
    if (this.empty())
      throw new Error("There's no laugh to pick, please generate again");

    let laugh = this.cache.splice(this.randomPicker(), 1)?.[0];

    return laugh;
  }

  randomPicker() {
    return this.left === 1 ? 0 : randomInt(0, this.left - 1);
  }

  empty() {
    return this.left === 0;
  }

  get left() {
    return this.cache.length;
  }
}
