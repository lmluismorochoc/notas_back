module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/create", users.create);

  // get all Users
  router.post("/find", users.findAll);

  // login
    router.post("/login", users.findOne);

  // Update a User with id
  router.post("/update", users.update);
  
  // Delete a User with id
  router.post("/delete", users.delete);

  app.use("/api/users", router);
};
