const db = require("../models");
const User = db.users;

// Create and Save a new User
exports.create = (req, res) => {

  // Create a User
  const user = new User({
    name:req.body.name,
    phone:req.body.phone,
    email:req.body.email,
    password:req.body.password,
    type:'user',
    idUser:req.body.idUser
  });

  // Save User in the database
  user
    .save(user)
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

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const idUser = req.body.idUser;

  var condition = idUser ? { idUser: { $regex: new RegExp(idUser), $options: "i" } } : {};

  console.log(condition )
  User.find(condition)
    .then(data => {
      res.send({code:1,data:data});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const email =  req.body.email;
  const password   =  req.body.password;

  User.find({ email: email,password:password })
    .then(data => {
      console.log(data )
      if (!data || data.length==0)
        res.send({code:0, message: " Correo o Clave incorrecto " });
      else res.send({code:1,data:data[0]});
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User with id=" + id });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {

  const id = req.body.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          code:0,
          message: `No se pudo actualizar Usuario con id=${id}.`
        });
      } else res.send({  code:1,message: "Usuario actualizado Correctamente." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.body.id;

  User.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          code:0,
          message: `No se pudo actualizar Usuario con id=${id}.`
        });
      } else {
        res.send({
          message: "Usuario eliminado correctamente!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

