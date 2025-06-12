const express = require("express");
const router = express.Router();
const { auth, authorize } = require("../middleware/auth.middleware");
const {
  createTicket,
  getAllTickets,
  getMyTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticket.controller");

router.use(auth);
router.post("/", authorize("user"), createTicket);
router.get("/my", authorize("user"), getMyTickets);
router.get("/:id", authorize("user", "agent"), getTicketById);
router.patch("/:id", authorize("user", "agent"), updateTicket);
router.delete("/:id", authorize("user", "agent"), deleteTicket);
router.get("/", authorize("agent", "admin"), getAllTickets);

module.exports = router;

