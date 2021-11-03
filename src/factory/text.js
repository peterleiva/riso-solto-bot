import { randomInt } from "crypto";

export default class Text {
  constructor({ text }) {
    this._type = "text";
    this._text = text;
  }

  get text() {
    return this._text;
  }

  get type() {
    return this._type;
  }

  reply(ctx) {
    let text = this.text;

    const matched = ctx?.message?.text?.match(/\d+/);
    const times = Number(matched?.[0]);

    if (!isNaN(times)) {
      const max = Math.min(randomInt(10, 254), Math.max(1, times));
      text = new Array(max).fill(text).join("");
    }

    ctx.reply(text);
  }
}
