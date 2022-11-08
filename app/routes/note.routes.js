module.exports = app => {
  const notes = require("../controllers/note.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/create", notes.create);

  // get all Notas
  router.post("/find", notes.findAll);

  // Update a User with id
  router.post("/update", notes.update);
  
  // Delete a User with id
  router.post("/delete", notes.delete);

  app.use("/api/notes", router);
};
