import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSignInSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("student@oth.de").regex(/^(?!.*admin).*$/).required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserCredentialsLogInSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("student@oth.de").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSignInSpec.keys({
  firstName: Joi.string().example("Max").required(),
  lastName: Joi.string().example("Huber").required(),
  type: Joi.string().example("user"),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const PlacemarkSpec = Joi.object()
  .keys({
    userid: IdSpec,
    name: Joi.string().required().example("Black Forest"),
    categoryname: Joi.string().required().example("Rainforest"),
  })
  .label("Placemark");

export const PlacemarkSpecPlus = Joi.object()
  .keys({
    userid: IdSpec,
    name: Joi.string().required().example("Black Forest"),
    categoryid: IdSpec,
    description: Joi.string().allow(null).example("nice forest"),
    location: Joi.string().allow(null).example("america"),
    weather: Joi.string().allow(null).example("hot"),
    image: Joi.string().allow(null).example("cloudinary"),
    _id: IdSpec,
    __v: Joi.number(),
}).label("PlacemarkPlus");

export const PlacemarkArraySpec = Joi.array().items(PlacemarkSpecPlus).label("PlacemarkArray");

export const CategorySpec = Joi.object()
  .keys({
    name: Joi.string().required().example("Rainforest"),
    count: Joi.number().required().example(2),
    _id: IdSpec,
    __v: Joi.number(),
}).label("Category");

export const CategoryArraySpec = Joi.array().items(CategorySpec).label("CategoryArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
    id: IdSpec,
  })
  .label("JwtAuth");

