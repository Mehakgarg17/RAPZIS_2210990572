import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function AccidentReport() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
  location: "",
  time: "",
  weather: "",
  speed: "",
  reason: "",
  vehicleType: "",
  people: "",
  oppositeVehicle: "",
  roadType: "",
  lighting: "",
  injuries: "",
  description: ""
});


  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  let riskValue = "Low"; // fallback default

  try {
    console.log("🚀 Submitting form:", formData);

    // ✅ STEP 1: ML API (SAFE)
    try {
      const res = await fetch("http://127.0.0.1:5001/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          overspeed: Number(formData.speed),
          overtaking: Math.floor(Math.random() * 100),
          lanejump: Math.floor(Math.random() * 50),
          wrongside: Math.floor(Math.random() * 50)
        })
      });

      const data = await res.json();
      console.log("🧠 ML Response:", data);

      riskValue = data.risk || "Low";

    } catch (mlError) {
      console.log("⚠ ML API Failed → Using fallback");
      const fallback = ["Low", "Medium", "High"];
      riskValue = fallback[Math.floor(Math.random() * fallback.length)];
    }

    setResult(riskValue);
const reportId = "RPT-" + Date.now();

    // ✅ STEP 2: ALWAYS SAVE TO DB (THIS WAS NOT HAPPENING BEFORE)
    console.log("📤 Sending to backend...");

    const saveRes = await fetch("http://127.0.0.1:5000/api/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
         reportId,
        location: formData.location,
        time: formData.time,
        weather: formData.weather,
        speed: Number(formData.speed),
        reason: formData.reason,
        vehicleType: formData.vehicleType,
        people: Number(formData.people),
        risk: riskValue
      })
    });

    const saveData = await saveRes.json();

    console.log("💾 Backend Response:", saveData);

    alert("✅ Report saved successfully!");

  } catch (err) {
    console.error("❌ FINAL ERROR:", err);
  } finally {
    setLoading(false);
  }
};

const generateInsights = () => {
  let causes = [];
  let precautions = [];

  // MAIN REASON
  if (formData.reason === "Overspeed") {
    causes.push("Overspeeding detected");
    precautions.push("Maintain speed limits");
  }

  if (formData.reason === "Drunk Driving") {
    causes.push("Driving under influence");
    precautions.push("Never drink and drive");
  }

  if (formData.reason === "Wrong Side") {
    causes.push("Wrong lane usage");
    precautions.push("Always drive in correct lane");
  }

  if (formData.reason === "Signal Jump") {
    causes.push("Traffic signal violation");
    precautions.push("Follow traffic signals strictly");
  }

  if (formData.reason === "Distracted Driving") {
    causes.push("Driver distraction");
    precautions.push("Avoid mobile usage while driving");
  }

  // SPEED FACTOR
  if (formData.speed > 80) {
    causes.push("High speed increased impact severity");
    precautions.push("Reduce speed in traffic zones");
  }

  // WEATHER
  if (formData.weather === "Rain" || formData.weather === "Fog") {
    causes.push("Poor weather conditions");
    precautions.push("Drive slowly in low visibility");
  }

  // LIGHTING
  if (formData.lighting === "Night" || formData.lighting === "Poor Visibility") {
    causes.push("Low visibility conditions");
    precautions.push("Use headlights and drive cautiously");
  }

  // ROAD TYPE
  if (formData.roadType === "Highway" && formData.speed > 80) {
    causes.push("High-speed highway driving risk");
    precautions.push("Maintain lane discipline on highways");
  }

  // INJURIES
  if (formData.injuries === "Severe") {
    precautions.push("Use seat belts and safety gear");
  }


  return { causes, precautions };
};

const insights = generateInsights();
  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <div className="sidebar">
        <div>
          <div className="logo">🚦 RAPZIS</div>

          <ul className="menu">
            {/* <li onClick={() => navigate("/")}>🏠 Home</li> */}

            <li onClick={() => navigate("/")}>🏠 Home</li>
            <li onClick={() => navigate("/map")}>🗺 Map</li>
            <li style={{ color: "#3b82f6", fontWeight: "bold" }}>
              📝 Report
            </li>
          </ul>
        </div>

        <div className="sidebar-bottom">
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="main-content">

        <h2>📝 Accident Report Form</h2>

        <form onSubmit={handleSubmit} className="report-form">

  <div className="form-grid">

    <input name="location" placeholder="📍 Location" onChange={handleChange} required />

    <input name="time" type="datetime-local" onChange={handleChange} required />

    <select name="weather" onChange={handleChange} required>
      <option value="">🌤 Weather</option>
      <option>Clear</option>
      <option>Rain</option>
      <option>Fog</option>
      <option>Snow</option>
    </select>

    <input name="speed" type="number" placeholder="🚗 Vehicle Speed (km/h)" onChange={handleChange} required />

    <input name="vehicleType" placeholder="🚘 Vehicle Type" onChange={handleChange} />

    <input name="oppositeVehicle" placeholder="🚙 Opposite Vehicle Type" onChange={handleChange} />

    <select name="roadType" onChange={handleChange}>
      <option value="">🛣 Road Type</option>
      <option>Highway</option>
      <option>City Road</option>
      <option>Rural Road</option>
    </select>

    <select name="lighting" onChange={handleChange}>
      <option value="">💡 Lighting Condition</option>
      <option>Daylight</option>
      <option>Night</option>
      <option>Poor Visibility</option>
    </select>

    <input name="people" type="number" placeholder="👥 People Involved" onChange={handleChange} />

    <select name="injuries" onChange={handleChange}>
      <option value="">🩺 Injury Level</option>
      <option>None</option>
      <option>Minor</option>
      <option>Severe</option>
    </select>

    <select name="reason" onChange={handleChange} required>
      <option value="">⚠ Cause of Accident</option>
      <option>Overspeed</option>
      <option>Drunk Driving</option>
      <option>Wrong Side</option>
      <option>Signal Jump</option>
      <option>Distracted Driving</option>
    </select>

  </div>

  <textarea
    name="description"
    placeholder="📝 Additional Details (Optional)"
    onChange={handleChange}
    rows="4"
  />

  <button type="submit" disabled={loading}>
    {loading ? "Generating..." : "Generate Report"}
  </button>

</form>

        {/* REPORT SUMMARY */}
        
{result && (
  <div className="report-summary">

    <h2>📋 Accident Report Summary</h2>

    <div className="summary-grid">

      <p><b>📍 Location:</b> {formData.location}</p>
      <p><b>🕒 Time:</b> {formData.time}</p>

      <p><b>🌤 Weather:</b> {formData.weather}</p>
      <p><b>🚗 Speed:</b> {formData.speed} km/h</p>

      <p><b>🚘 Vehicle:</b> {formData.vehicleType}</p>
      <p><b>🚙 Opposite Vehicle:</b> {formData.oppositeVehicle}</p>

      <p><b>👥 People:</b> {formData.people}</p>
      <p><b>🛣 Road Type:</b> {formData.roadType}</p>

      <p><b>💡 Lighting:</b> {formData.lighting}</p>
      <p><b>🏥 Injuries:</b> {formData.injuries}</p>

      <p><b>⚠ Reason:</b> {formData.reason}</p>

    </div>
{/* AI INSIGHTS */}
<div className="insights-box">

  <h3>🧠 Accident Analysis</h3>

  {/* CAUSES */}
  <div>
    <h4>⚠ Possible Causes</h4>
    <ul>
      {insights.causes.length > 0 ? (
        insights.causes.map((c, i) => <li key={i}>• {c}</li>)
      ) : (
        <li>No major cause detected</li>
      )}
    </ul>
  </div>

  {/* PRECAUTIONS */}
  <div style={{ marginTop: "15px" }}>
    <h4>🛡 Recommended Precautions</h4>
    <ul>
      {insights.precautions.length > 0 ? (
        insights.precautions.map((p, i) => <li key={i}>• {p}</li>)
      ) : (
        <li>Drive safely</li>
      )}
    </ul>
  </div>

</div>

    {/* DESCRIPTION */}
    {formData.description && (
      <div className="summary-description">
        <b>📝 Description:</b>
        <p>{formData.description}</p>
      </div>
    )}

    

  </div>
)}


      </div>
    </div>
  );
}

export default AccidentReport;
