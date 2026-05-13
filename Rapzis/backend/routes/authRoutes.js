const express = require("express");
const router = express.Router();
const User = require("../models/User");

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  try {
    console.log("BODY:", req.body); // 👈 check incoming data

    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    console.error("REGISTER ERROR:", err); // 👈 THIS WILL SHOW REAL ERROR
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
