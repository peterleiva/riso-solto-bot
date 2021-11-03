import mongoose from "mongoose";
const { Schema, model } = mongoose;

const sourceSchema = new Schema({
  service: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
  },

  id: {
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

const PhotoModel = model("Photo", photoSchema);

export default PhotoModel;
