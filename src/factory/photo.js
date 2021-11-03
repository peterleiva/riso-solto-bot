export default class Photo {
  constructor({ url }) {
    this._type = "photo";
    this._url = url;
  }

  get url() {
    return this._url;
  }

  get type() {
    return this._type;
  }

  reply(ctx) {
    ctx.replyWithPhoto(this.url);
  }
}
