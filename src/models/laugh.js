import mongoose from "mongoose";
const { Schema, model } = mongoose;

const laughSchema = new Schema({
  tags: [
    { type: String, minlength: 2, maxlength: 20, trim: true, index: true },
  ],
});

const LaughModel = model("Laugh", laughSchema);

export default LaughModel;
