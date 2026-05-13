const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    location: String,
    time: String,
    weather: String,
    speed: Number,
    reason: String,
    vehicleType: String,
    people: Number,
    risk: String,
    oppositeVehicle: String,
    roadType: String,
    lighting: String,
    injuries: String,
    description: String

}, { timestamps: true });

module.exports = mongoose.model("Report", reportSchema);
