import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
  userid: String,
  name: String,
  categoryid: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  description: String,
  analytics: String,
  location: String,
  weather: String,
  images: String,
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);
