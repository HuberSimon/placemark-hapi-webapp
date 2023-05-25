import { userMemStore } from "./mem/user-mem-store.js";
import { placemarksMemStore } from "./mem/placemarks-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { placemarkJsonStore } from "./json/placemarks-json-store.js";
import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { placemarkMongoStore } from "./mongo/placemark-mongo-store.js";

export const db = {
  userStore: null,
  placemarksStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.placemarksStore = placemarkJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.placemarksStore = placemarkMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.placemarksStore = placemarksMemStore;
    }
  },
};
