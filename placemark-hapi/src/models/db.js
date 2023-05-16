import { userMemStore } from "./mem/user-mem-store.js";
import { placemarksMemStore } from "./mem/placemarks-mem-store.js";

export const db = {
  userStore: null,
  placemarksStore: null,

  init(storeType) {
    switch (storeType) {
      case "mem":
        this.userStore = userMemStore;
        this.placemarksStore = placemarksMemStore;
        break;
      default:
    }
  },
};
