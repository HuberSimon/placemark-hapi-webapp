import Boom from "@hapi/boom";
import { IdSpec, PlacemarkArraySpec, PlacemarkSpec, PlacemarkSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const placemarkApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemarks = await db.placemarksStore.getAllPlacemarks();
        return placemarks;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: PlacemarkArraySpec, failAction: validationError },
    description: "Get all placemarks",
    notes: "Returns all placemarks",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const placemark = await db.placemarksStore.getPlacemarkById(request.params.id);
        if (!placemark) {
          return Boom.notFound("No Placemark with this id");
        }
        return placemark;
      } catch (err) {
        return Boom.serverUnavailable("No Placemark with this id");
      }
    },
    tags: ["api"],
    description: "Find a Placemark",
    notes: "Returns a placemark",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PlacemarkSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemark = request.payload;
        let category = await db.categoryStore.getCategoryByName(placemark.categoryname)
        if (!category){
          const newCategory ={
            name: placemark.categoryname,
            count: 1,
          }
          const addedcategory = await db.categoryStore.addCategory(newCategory);
          category = await db.categoryStore.getCategoryById(addedcategory._id);
        }else{
          await db.categoryStore.incrementCategoryById(category._id);
        }
        const categoryid = category._id;

        const newPlacemark = {
          userid: placemark.userid,
          name: placemark.name,
          categoryid: categoryid,
          description: null,
          location: null,
          locLat: null,
          locLng: null,
          weather: null,
          image: null,
        };
        
        const addedplacemark = await db.placemarksStore.addPlacemark(newPlacemark);
  
        if (addedplacemark) {
          return h.response(addedplacemark).code(201);
        }
        return Boom.badImplementation("error creating placemark");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Placemark",
    notes: "Returns the newly created placemark",
    validate: { payload: PlacemarkSpec, failAction: validationError },
    response: { schema: PlacemarkSpecPlus, failAction: validationError },
  },

  update: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemarkinfo = request.payload;
        const oldplacemark = await db.placemarksStore.getPlacemarkById(request.params.id);

        const newPlacemarkDetails = { 
          userid: oldplacemark.userid,
          placemarkid: oldplacemark._id,
          name: oldplacemark.name,
          categoryid: oldplacemark.categoryid,
          description: placemarkinfo.description,
          location: placemarkinfo.location,
          locLat: placemarkinfo.locLat,
          locLng: placemarkinfo.locLng,
          weather: placemarkinfo.weather,
          image: placemarkinfo.image,
        };

        const updatedplacemark = await db.placemarksStore.updatePlacemarkDetails(newPlacemarkDetails);
        
        if (updatedplacemark) {
          return h.response(updatedplacemark).code(200);
        }
        return Boom.badImplementation("error creating placemark");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Update a Placemark",
    notes: "Returns the updated placemark",
    validate: { params: { id: IdSpec }, failAction: validationError },
   },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemark = await db.placemarksStore.getPlacemarkById(request.params.id);
        if (!placemark) {
          return Boom.notFound("No Placemark with this id");
        }
        await db.categoryStore.decrementCategoryById(placemark.categoryid);
        await db.placemarksStore.deletePlacemarkById(placemark._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Placemark with this id");
      }
    },
    tags: ["api"],
    description: "Delete a placemark",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.placemarksStore.deleteAllPlacemarks();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all PlacemarkApi",
  },

  deleteDetails: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemark = await db.placemarksStore.getPlacemarkById(request.params.id);
        if(placemark.image) await imageStore.deleteImage(placemark.image);
        await db.placemarksStore.deletePlacemarkDetails(placemark._id);      
        return h.response().code(200);
      } catch (err) {
        return Boom.serverUnavailable("No Placemark with this id");
      }
    },
    tags: ["api"],
    description: "Delete placemark Details",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};
