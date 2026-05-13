import express from "express";
import Accident from "../models/Accident.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const totalAccidents = await Accident.countDocuments();

    const highRisk = await Accident.countDocuments({ riskLevel: "High" });
    const mediumRisk = await Accident.countDocuments({ riskLevel: "Medium" });
    const lowRisk = await Accident.countDocuments({ riskLevel: "Low" });

    res.json({
      totalAccidents,
      highRisk,
      mediumRisk,
      lowRisk
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
