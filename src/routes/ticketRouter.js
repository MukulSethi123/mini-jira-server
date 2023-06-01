const express = require("express");
const router = express.Router();
const allTickets = require("../model/ticketsModel");
const { Mongoose, default: mongoose } = require("mongoose");

//get all tickets
router.get("/", async (req, res) => {
  try {
    const allTicketsData = await allTickets.find();
    res.json(allTicketsData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// get one ticket
router.get("/:id", getTicket, async (req, res) => {
  try {
    //parse Int cz the data is returned as a string and Id is int type
    //aggreigate with the $match searches based on your custom fields
    const id = parseInt(req.params.id);
    const ticket = await allTickets.aggregate([
      {
        $match: {
          Id: id,
        },
      },
    ]);
    console.log(ticket);
    res.json(ticket);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

////add ticket to all tickets
router.post("/", async (req, res, next) => {
  console.log("++++++++++++++post++++++++++++++++");
  let ticket = new allTickets({
    Id: parseInt(req.body.Id),
    boardId: parseInt(req.body.boardId),
    title: req.body.title,
    details: req.body.details,
  });

  try {
    const ticketToSave = await ticket.save();
    res.status(200).json(ticketToSave);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

//// delete tickets
router.post("/delete/:id", async (req, res) => {
  console.log("++++++++++++++delete post++++++++++++++++");
  console.log(req.params.id);
  try {
    const id = req.params.id;
    const data = await allTickets.deleteOne({ Id: id });
    res.send(`Document with ${data} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

///////middle ware//////
// I forgot how this works exactly
async function getTicket(req, res, next) {
  let ticket;
  try {
    ticket = await allTickets.findOne({ Id: req.params.Id });
    if (ticket === null) {
      res.status(404).json({ message: "cannot find ticket" });
    }
  } catch (e) {
    res.status(500).json({ message: error.message });
  }
  res.ticket = ticket;
  next();
}
module.exports = router;
