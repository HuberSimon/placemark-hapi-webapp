import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
  userid: String,
  name: String,
  category: String,
  description: String,
  analytics: String,
  location: String,
  weather: String,
  images: String,
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);
