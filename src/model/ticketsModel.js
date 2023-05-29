const mongoose = require("mongoose");

const allticketSchema = new mongoose.Schema({
  alltickets: {
    Id: Number,
    boardId: Number,
    title: String,
    details: String,
  },
});

module.exports = mongoose.model("allTickets", allticketSchema);
