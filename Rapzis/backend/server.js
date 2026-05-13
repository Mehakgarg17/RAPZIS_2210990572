const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

/* ✅ USE ROUTES */
app.use("/api/auth", authRoutes);
// ✅ IMPORT ROUTE
const reportRoutes = require("./routes/reportRoutes");

// ✅ USE ROUTE
app.use("/api", reportRoutes);

/* DB */
mongoose.connect("mongodb://127.0.0.1:27017/rapzisDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
