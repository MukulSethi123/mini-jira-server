const e = require("express");
const express = require("express");
const router = express.Router();
const allTickets = require("../model/ticketsModel");

const database = require("../../index");

//get all
router.get("/", async (req, res) => {
  try {
    const allTicketsData = await allTickets.find();
    console.log("++++++++++++++++get all++++++++++++++++++++");
    console.log(allTicketsData);
    res.json(allTicketsData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// get one ticket
router.get("/:Id", getTicket, async (req, res) => {
  try {
    console.log("++++++++++++++++get one++++++++++++++++++++");
    const id = req.params.Id;
    console.log(id);
    // const ticket = await allTickets.findOne((allTickets.id = 1));
    // res.json(ticket);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

////posts
router.post("/", async (req, res, next) => {
  console.log("++++++++++++++post ticket++++++++++++++++");
  //   console.log("collections+++++++++++=", database.collections.allTickets);
  const ticket = new allTickets({
    Id: req.body.Id,
    boardId: req.body.boardId,
    title: req.body.title,
    details: req.body.details,
  });
  try {
    console.log(ticket);
    const newTicket = await ticket.save();

    res.status(201).json(newTicket);
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
});

// ///////middle ware//////
async function getTicket(req, res, next) {
  let ticket;
  try {
    ticket = await allTickets.findOne(req.params.Id);
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
