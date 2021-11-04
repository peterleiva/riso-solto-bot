import mongoose from "mongoose";
import { Laugh } from "#laugh";

const { Schema } = mongoose;

const sourceSchema = new Schema({
  service: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },

  serviceId: {
    type: String,
    required: true,
    unique: true,
  },

  original: Schema.Types.Mixed,
});

const photoSchema = new Schema({
  url: String,
  file: Buffer,

  source: {
    type: sourceSchema,
    required: true,
  },
});

photoSchema.method("reply", function (ctx) {
  ctx.replyWithPhoto(this.url);
});

const PhotoModel = Laugh.discriminator("Photo", photoSchema);

export default PhotoModel;
