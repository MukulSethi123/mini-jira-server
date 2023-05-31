const mongoose = require("mongoose");

const allticketSchema = new mongoose.Schema({
  Id: Number,
  boardId: Number,
  title: String,
  details: String,
});

module.exports = mongoose.model("allTickets", allticketSchema);
