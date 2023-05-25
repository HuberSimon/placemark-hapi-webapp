import { Placemark } from "./placemark.js";

export const placemarkMongoStore = {
  async getAllPlacemarks() {
    const placemarks = await Placemark.find().lean();
    return placemarks;
  },

  async getPlacemarkById(id) {
    if (id) {
        const placemark = await Placemark.findOne({ _id: id }).lean();
        if (placemark) {
            return placemark;
        }
    }
    return null;
  },

  async addPlacemark(placemark) {
    const newPlacemark = new Placemark(placemark);
    const placemarkObj = await newPlacemark.save();
    const p = await this.getPlacemarkById(placemarkObj._id);
    return p;
  },

  async getUserPlacemarks(id) {
    const placemark = await Placemark.find({ userid: id }).lean();
    return placemark;
  },

  async deletePlacemarkById(id) {
    try {
        await Placemark.deleteOne({ _id: id });
      } catch (error) {
        console.log("bad id");
      }
  },

  async deleteAllPlacemarks() {
    await Placemark.deleteMany({});
  },

  async updatePlacemarkDetails(placemarkDetails) {
    const placemark = await Placemark.findById({ _id: placemarkDetails.placemarkid });

    if (placemarkDetails.category !== "") placemark.category =  placemarkDetails.category;
    if (placemarkDetails.description !== "") placemark.description =  placemarkDetails.description;
    if (placemarkDetails.analytics !== "") placemark.analytics =  placemarkDetails.analytics;
    if (placemarkDetails.location !== "") placemark.location =  placemarkDetails.location;
    if (placemarkDetails.weather !== "") placemark.weather =  placemarkDetails.weather;
    if (placemarkDetails.images !== "") placemark.images =  placemarkDetails.images;
    await placemark.save();
    return placemarkDetails;
  },

  async deletePlacemarkDetails(id) {
    const placemark = await Placemark.findById({ _id: id });

    placemark.category = "";
    placemark.description = "";
    placemark.analytics = "";
    placemark.location = "";
    placemark.weather = "";
    placemark.images = "";
    await placemark.save();
  },
};
