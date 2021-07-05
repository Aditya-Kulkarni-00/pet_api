// Database Connection , Pet Model
const { dbUrl, dbOptions } = require("./config/database.config");
const Pet = require("./models/schema.pet");
const mongoose = require("mongoose");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//parse url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

//parse json
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

// Database Configuration :

mongoose
  .connect(dbUrl, dbOptions)
  .then(() => console.log("Connected"))
  .catch((err) => {
    console.log("Error when connecting database : ", err);
    process.exit();
  });

// Defining a Route :

app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to Pet Store application go to the respective routes for more",
  });
});

require("./routes/pet.routes")(app);

app.listen(3030, () => {
  console.log("Connected Successfully");
});
