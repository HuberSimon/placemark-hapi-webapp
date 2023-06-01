import Mongoose from "mongoose";

const { Schema } = Mongoose;

const categorySchema = new Schema({
  name: String,
  count: Number,
});

export const Category = Mongoose.model("Category", categorySchema);
