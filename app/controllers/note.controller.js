const db = require("../models");
const Note = db.notes;

// Create and Save a new Note
exports.create = (req, res) => {

  // Create a Note
  const note = new Note({
    title:req.body.title,
    description:req.body.description,
    idUser:req.body.idUser
  });

  // Save Note in the database
  note
    .save(note)
    .then(data => {
      res.send({code:1,data:data});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error intente mas tarde."
      });
    });
};

// Retrieve all Notes from the database.
exports.findAll = (req, res) => {
  const idUser = req.body.idUser;
  var condition = idUser ? { idUser: { $regex: new RegExp(idUser), $options: "i" } } : {};

  console.log(condition )
  Note.find(condition)
    .then(data => {
      res.send({code:1,data:data});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving notes."
      });
    });
};

// Update a Note by the id in the request
exports.update = (req, res) => {

  const id = req.body.id;

  Note.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          code:0,
          message: `No se pudo actualizar Nota con id=${id}.`
        });
      } else res.send({  code:1,message: "Nota actualizado Correctamente." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Note with id=" + id
      });
    });
};

// Delete a Note with the specified id in the request
exports.delete = (req, res) => {
  const id = req.body.id;

  Note.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          code:0,
          message: `No se pudo actualizar Nota con id=${id}.`
        });
      } else {
        res.send({
          message: "Nota eliminada correctamente!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Note with id=" + id
      });
    });
};


