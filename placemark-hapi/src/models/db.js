import { userMemStore } from "./mem/user-mem-store.js";
import { placemarksMemStore } from "./mem/placemarks-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { placemarkJsonStore } from "./json/placemarks-json-store.js";

export const db = {
  userStore: null,
  placemarksStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.placemarksStore = placemarkJsonStore;
        break;
      default:
        this.userStore = userMemStore;
        this.placemarksStore = placemarksMemStore;
    }
  },
};
