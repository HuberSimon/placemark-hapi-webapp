import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const db = new Low(new JSONFile("./src/models/json/placemarks.json"), "placemark");
db.data = { placemarks: [] };

export const placemarkJsonStore = {
  async getAllPlacemarks() {
    await db.read();
    return db.data.placemarks;
  },

  async addPlacemark(placemark) {
    await db.read();
    placemark._id = v4();
    db.data.placemarks.push(placemark);
    await db.write();
    return placemark;
  },

  async getPlacemarkById(id) {
    await db.read();
    const list = db.data.placemarks.find((placemark) => placemark._id === id);
    if (list) {
      return list;
    }
    return null;
  },

  async getUserPlacemarks(userid) {
    await db.read();
    return db.data.placemarks.filter((placemark) => placemark.userid === userid);
  },

  async deletePlacemarkById(id) {
    await db.read();
    const index = db.data.placemarks.findIndex((placemark) => placemark._id === id);
    if (index !== -1) db.data.placemarks.splice(index, 1);
    await db.write();
  },

  async deleteAllPlacemarks() {
    db.data.placemarks = [];
    await db.write();
  },

  async updatePlacemarkDetails(placemarkDetails) {
    await db.read();
    const index = db.data.placemarks.findIndex((placemark) => placemark._id === placemarkDetails.placemarkid);

    if (placemarkDetails.category !== "") db.data.placemarks[index].category =  placemarkDetails.category;
    if (placemarkDetails.description !== "") db.data.placemarks[index].description =  placemarkDetails.description;
    if (placemarkDetails.analytics !== "") db.data.placemarks[index].analytics =  placemarkDetails.analytics;
    if (placemarkDetails.location !== "") db.data.placemarks[index].location =  placemarkDetails.location;
    if (placemarkDetails.weather !== "") db.data.placemarks[index].weather =  placemarkDetails.weather;
    if (placemarkDetails.images !== "") db.data.placemarks[index].images =  placemarkDetails.images;
    await db.write();
    return placemarkDetails;
  },

  async deletePlacemarkDetails(id) {
    await db.read();
    const index = db.data.placemarks.findIndex((placemark) => placemark._id === id);

    db.data.placemarks[index].category = "";
    db.data.placemarks[index].description = "";
    db.data.placemarks[index].analytics = "";
    db.data.placemarks[index].location = "";
    db.data.placemarks[index].weather = "";
    db.data.placemarks[index].images = "";
    await db.write();
  },
};
