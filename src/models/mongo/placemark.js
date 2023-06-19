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
  location: String,
  locLat: Number,
  locLng: Number,
  weather: String,
  image: String,
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);
