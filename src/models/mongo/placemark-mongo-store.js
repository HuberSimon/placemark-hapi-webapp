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

    if (placemarkDetails.description !== "") placemark.description =  placemarkDetails.description;
    if (placemarkDetails.location !== "") placemark.location =  placemarkDetails.location;
    if (placemarkDetails.locLat !== 0) placemark.locLat =  placemarkDetails.locLat;
    if (placemarkDetails.locLng !== 0) placemark.locLng =  placemarkDetails.locLng;
    if (placemarkDetails.weather !== "") placemark.weather =  placemarkDetails.weather;
    if (placemarkDetails.image !== "") placemark.image =  placemarkDetails.image;
    await placemark.save();
    return placemarkDetails;
  },


  async deletePlacemarkDetails(id) {
    const placemark = await Placemark.findById({ _id: id });

    placemark.description = "";
    placemark.location = "";
    placemark.locLat = 0;
    placemark.locLng = 0;
    placemark.weather = "";
    placemark.image = "";
    await placemark.save();
  },
};
