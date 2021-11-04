import mongoose from "mongoose";
import { Laugh } from "#laugh";
import { multiplier, numberParser } from "./utils/index.js";

const { Schema } = mongoose;

const textSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1,
    maxlength: 20,
  },
});

textSchema.method("reply", function (ctx) {
  const response = multiplier(this.token, numberParser(ctx.message.text));
  ctx.reply(response);

  return response;
});

const TextModel = Laugh.discriminator("Text", textSchema);

export default TextModel;
