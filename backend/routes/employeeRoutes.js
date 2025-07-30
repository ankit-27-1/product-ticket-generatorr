const express = require("express");
const router = express.Router();
const Ticket = require("../models/ticketCreate");

router.get("/:userId/tickets", async (req, res) => {
  try {
    const userId = req.params.userId;

    const employeeTickets = await Ticket.find({ assignedTo: userId });

    res.status(200).json(employeeTickets);
  } catch (error) {
    console.error("Error fetching employee tickets", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
