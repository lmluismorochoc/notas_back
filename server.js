const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8080;

const db = require("./app/models");
require("./app/routes/user.routes")(app);
require("./app/routes/note.routes")(app);
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "El servidor se encuentra en línea." });
});

app.listen(PORT, () => {
  console.log(`Servidoor corriendo en el puerto ${PORT}.`);
});
