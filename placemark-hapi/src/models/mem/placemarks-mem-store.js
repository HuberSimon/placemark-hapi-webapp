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
    return placemarks.find((placemark) => placemark._id === id);
  },

  async getUserPlacemarks(userid) {
    return placemarks.filter((placemark) => placemark.userid === userid);
  },

  async deletePlacemarkById(id) {
    const index = placemarks.findIndex((placemark) => placemark._id === id);
    placemarks.splice(index, 1);
  },

  async deleteAllPlacemarks() {
    placemarks = [];
  },
};