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

export const PlacemarkSpecPlus = PlacemarkSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlacemarkPlus");

export const PlacemarkArraySpec = Joi.array().items(PlacemarkSpecPlus).label("PlacemarkArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");

