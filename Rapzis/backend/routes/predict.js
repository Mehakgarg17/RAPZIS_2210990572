const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/predict", async (req, res) => {

  try {

    const response = await axios.post(
      "http://localhost:5001/predict",
      req.body
    );

    res.json(response.data);

  } catch (err) {
    res.status(500).json({ error: "Prediction failed" });
  }

});

module.exports = router;
