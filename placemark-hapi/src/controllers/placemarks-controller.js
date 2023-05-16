import { db } from "../models/db.js";

export const placemarksController = {
    index: {
      handler: async function (request, h) {
        const loggedInUser = request.auth.credentials;
        const placemarks = await db.placemarksStore.getUserPlacemarks(loggedInUser._id);
        const viewData = {
          title: "Placemarks Dashboard",
          user: loggedInUser,
          placemarks: placemarks,
        };
        return h.view("Placemarks", viewData);
      },
    },
    addPlacemark: {
      handler: async function (request, h) {
        try {
          const loggedInUser = request.auth.credentials;
          const newPlacemark = {
            userid: loggedInUser._id,
            name: request.payload.name,
          };
          await db.placemarksStore.addPlacemark(newPlacemark);
          return h.redirect("/placemarks");
        } catch (err) {
          return h.view("main", { errors: [{ message: err.message }] });
        }
      },
    },
  };
  