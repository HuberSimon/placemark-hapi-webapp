import { db } from "../models/db.js";

export const adminController = {
    index: {
        handler: async function (request, h) {
          const loggedInUser = request.auth.credentials;
          const users = await db.userStore.getAllUsers();
          const viewData = {
            title: "Admin Dashboard",
            user: loggedInUser,
            users: users,
          };
          return h.view("AdminDashboard", viewData);
        },
      },
  deleteUser: {
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.id);
      await db.userStore.deleteUserById(user._id);
      return h.redirect("/admindashboard");
    },
  },

};
