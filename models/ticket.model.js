const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved", "closed"],
      default: "open",
    },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);

