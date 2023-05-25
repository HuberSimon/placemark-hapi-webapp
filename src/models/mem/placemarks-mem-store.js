import { v4 } from "uuid";

let placemarks = [];

export const placemarksMemStore = {
  async getAllPlacemarks() {
    return placemarks;
  },

  async addPlacemark(placemark) {
    placemark._id = v4();
    placemarks.push(placemark);
    return placemark;
  },

  async getPlacemarkById(id) {
    const list = placemarks.find((placemark) => placemark._id === id);
    if (list) {
      return list;
    }
    return null;
  },

  async getUserPlacemarks(userid) {
    return placemarks.filter((placemark) => placemark.userid === userid);
  },

  async deletePlacemarkById(id) {
    const index = placemarks.findIndex((placemark) => placemark._id === id);
    if (index !== -1) placemarks.splice(index, 1);
  },

  async deleteAllPlacemarks() {
    placemarks = [];
  },

  async updatePlacemarkDetails(placemarkDetails) {
    const index = placemarks.findIndex((placemark) => placemark._id === placemarkDetails.placemarkid);
    if (placemarkDetails.category !== "") placemarks[index].category =  placemarkDetails.category;
    if (placemarkDetails.description !== "") placemarks[index].description =  placemarkDetails.description;
    if (placemarkDetails.analytics !== "") placemarks[index].analytics =  placemarkDetails.analytics;
    if (placemarkDetails.location !== "") placemarks[index].location =  placemarkDetails.location;
    if (placemarkDetails.weather !== "") placemarks[index].weather =  placemarkDetails.weather;
    if (placemarkDetails.images !== "") placemarks[index].images =  placemarkDetails.images;
    return placemarkDetails;
  },

  async deletePlacemarkDetails(id) {
    const index = db.data.placemarks.findIndex((placemark) => placemark._id === id);

    db.data.placemarks[index].category = "";
    db.data.placemarks[index].description = "";
    db.data.placemarks[index].analytics = "";
    db.data.placemarks[index].location = "";
    db.data.placemarks[index].weather = "";
    db.data.placemarks[index].images = "";
  },
};