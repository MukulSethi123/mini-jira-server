const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const mongoString = process.env.DATABASE_URL;
const port = 3080;

//data base related part
mongoose.connect(mongoString, { useNewUrlParser: true });
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("database connected");
});

//api related part

app = express();
// Define your whitelist (allowed origins)
const whitelist = ["http://localhost:3080/"];

app.use(cors());
const bodyParser = require("body-parser");

app.use(express.json());
// create application/json parser
var jsonParser = bodyParser.json();

const ticketRouter = require("./src/routes/ticketRouter");
app.use("/", jsonParser, ticketRouter);

app.listen(port, () => {
  console.log("running server on 3080");
});
module.exports = database;
