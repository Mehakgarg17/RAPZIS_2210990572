const express = require("express");
const router = express.Router();
const Report = require("../models/Report");

router.post("/report", async (req, res) => {
  try {
    console.log("🔥 API HIT");
    console.log("Incoming Data:", req.body);

    /* ===== VALIDATION ===== */
    if (!req.body.location || !req.body.time) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    /* ===== SAVE ===== */
    const newReport = new Report({
      location: req.body.location,
      time: req.body.time,
      weather: req.body.weather,
      speed: Number(req.body.speed),
      reason: req.body.reason,
      vehicleType: req.body.vehicleType,
      people: Number(req.body.people),
      risk: req.body.risk
    });

    const savedReport = await newReport.save();

    console.log("✅ SAVED TO DB:", savedReport);

    res.status(200).json({
      message: "Report saved successfully",
      data: savedReport
    });

  } catch (error) {
    console.error("❌ SAVE ERROR:", error);

    res.status(500).json({
      message: "Error saving report",
      error: error.message
    });
  }
});

module.exports = router;
