require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const authRoutes = require("./routes/auth.routes");
const ticketRoutes = require("./routes/ticket.routes");
const adminRoutes = require("./routes/admin.routes");
const errorHandler = require("./middleware/error.middleware");


mongoose.connect("mongodb://127.0.0.1:27017/Books")
.then(()=>{
  console.log("mongodb connected")
})
.catch((error)=>{
  console.log(error)
})

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/tickets", ticketRoutes);
app.use("/admin", adminRoutes);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
}
);  

