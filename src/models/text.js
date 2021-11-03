import mongoose from "mongoose";

const { model, Schema } = mongoose;

const textSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1,
    maxlength: 20,
  },

  tags: [String],
});

const TextModel = model("Text", textSchema);

export default TextModel;
