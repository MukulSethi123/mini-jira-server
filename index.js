const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

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
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const ticketRouter = require("./src/routes/ticketRouter");
app.use("/", ticketRouter);

app.listen(port, () => {
  console.log("running server on 3080");
});
module.exports = database;
