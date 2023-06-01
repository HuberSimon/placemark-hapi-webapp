import { PlacemarkSpec, PlacemarkSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const placemarksController = {
    index: {
      handler: async function (request, h) {
        const loggedInUser = request.auth.credentials;
        const placemarks = await db.placemarksStore.getUserPlacemarks(loggedInUser._id);
        const userCategories = await db.categoryStore.getUserCategories(loggedInUser._id);
        const placemark = null;
        const viewData = {
          title: "Placemarks Dashboard",
          user: loggedInUser,
          placemarks: placemarks,
          userCategories: userCategories,
          placemark: placemark,
        };
        return h.view("Placemarks", viewData);
      },
    },
    addPlacemark: {
      validate: {
        payload: PlacemarkSpec,
        options: { abortEarly: false },
        failAction: function (request, h, error) {
          return h.view("placemarks", { title: "Add Placemark error", errors: error.details }).takeover().code(400);
        },
      },
      handler: async function (request, h) {
          const loggedInUser = request.auth.credentials;
          let category = await db.categoryStore.getCategoryByName(request.payload.categoryname)
          if (!category){
            const newCategory ={
              name: request.payload.categoryname,
              count: 1,
            }
            const addedcategory = await db.categoryStore.addCategory(newCategory);
            category = await db.categoryStore.getCategoryById(addedcategory._id);
          }else{
            await db.categoryStore.incrementCategoryById(category._id);
          }
          const categoryid = category._id;

          const newPlacemark = {
            userid: loggedInUser._id,
            name: request.payload.name,
            categoryid: categoryid,
            description: null,
            analytics: null,
            location: null,
            weather: null,
            images: null,
          };
          
          const addedPlacemark = await db.placemarksStore.addPlacemark(newPlacemark);
          const placemark = await db.placemarksStore.getPlacemarkById(addedPlacemark._id);
          return h.redirect(`/placemarks/${placemark._id}`);
      },
    },
    deletePlacemark: {
      handler: async function (request, h) {
        const placemark = await db.placemarksStore.getPlacemarkById(request.params.id);
        await db.categoryStore.decrementCategoryById(placemark.categoryid)
        await db.placemarksStore.deletePlacemarkById(placemark._id);
        return h.redirect("/placemarks");
      },
    },
    showPlacemarkDetails: {
      handler: async function (request, h) {
        
        const loggedInUser = request.auth.credentials;
        const placemark = await db.placemarksStore.getPlacemarkById(request.params.id);
        const placemarks = await db.placemarksStore.getUserPlacemarks(loggedInUser._id);
        const userCategories = await db.categoryStore.getUserCategories(loggedInUser._id);
        const viewData = {
          title: "Placemarks Dashboard",
          user: loggedInUser,
          placemarks: placemarks,
          userCategories: userCategories,
          placemark: placemark,
          description: placemark.description,
          analytics: placemark.analytics,
          location: placemark.location,
          weather: placemark.weather,
          images: placemark.images,
        };
        return h.view("Placemarks", viewData);
      },
    },
    updateDetails: {
      handler: async function (request, h) {
          const loggedInUser = request.auth.credentials;
          const placemark = await db.placemarksStore.getPlacemarkById(request.params.id);
          const placemarkname = placemark.name;
          const newPlacemarkDetails = {
            userid: loggedInUser._id,
            placemarkid: request.params.id,
            name: placemarkname,
            category: request.payload.category,
            description: request.payload.description,
            analytics: request.payload.analytics,
            location: request.payload.location,
            weather: request.payload.weather,
            images: request.payload.images,
          };
          await db.placemarksStore.updatePlacemarkDetails(newPlacemarkDetails);
          return h.redirect(`/placemarks/${placemark._id}`);
      },
    },
    deleteDetails: {
      handler: async function (request, h) {
          const placemark = await db.placemarksStore.getPlacemarkById(request.params.id);

          await db.placemarksStore.deletePlacemarkDetails(placemark._id);
          return h.redirect(`/placemarks/${placemark._id}`);
      },
    },
  };
  