const Ticket = require("../models/ticket.model");

exports.createTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(ticket);
  } catch (err) {
    next(err);
  }
};

exports.getAllTickets = async (req, res, next) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;
    const query = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    };
    const tickets = await Ticket.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate("createdBy assignedTo");
    res.json(tickets);
  } catch (err) {
    next(err);
  }
};

exports.getMyTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find({ createdBy: req.user._id });
    res.json(tickets);
  } catch (err) {
    next(err);
  }
};

exports.getTicketById = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate("createdBy assignedTo");
    res.json(ticket);
  } catch (err) {
    next(err);
  }
};

exports.updateTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    if (ticket.createdBy.toString() !== req.user._id.toString() && req.user.role === "user") {
      return res.status(403).json({ message: "Not authorized" });
    }
    Object.assign(ticket, req.body);
    await ticket.save();
    res.json(ticket);
  } catch (err) {
    next(err);
  }
};

exports.deleteTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    if (ticket.createdBy.toString() !== req.user._id.toString() && req.user.role === "user") {
      return res.status(403).json({ message: "Not authorized" });
    }
    await ticket.deleteOne();
    res.json({ message: "Ticket deleted" });
  } catch (err) {
    next(err);
  }
};

