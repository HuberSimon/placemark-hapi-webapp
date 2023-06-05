import { accountsController } from "./controllers/accounts-controller.js";
import { placemarksController } from "./controllers/placemarks-controller.js";
import { adminController } from "./controllers/admin-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/admindashboard", config: adminController.index },
  { method: "GET", path: "/admindashboard/deleteuser/{id}", config: adminController.deleteUser },

  { method: "GET", path: "/placemarks", config: placemarksController.index },
  { method: "POST", path: "/placemarks/addplacemark", config: placemarksController.addPlacemark },
  { method: "GET", path: "/placemarks/deleteplacemark/{id}", config: placemarksController.deletePlacemark },
  { method: "GET", path: "/placemarks/{id}", config: placemarksController.showPlacemarkDetails },

  { method: "POST", path: "/placemarks/{id}/updatedetails", config: placemarksController.updateDetails },
  { method: "GET", path: "/placemarks/{id}/deletedetails", config: placemarksController.deleteDetails },


  {
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: "./public",
      },
    },
    options: { auth: false },
  }, 
  
];