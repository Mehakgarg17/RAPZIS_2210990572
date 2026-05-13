import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"
import Home from "./components/Home";
import MapSection from "./components/MapSection";
import AccidentReport from "./components/AccidentReport";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
useEffect(() => {
    const savedLogin = localStorage.getItem("isLoggedIn");
    if (savedLogin === "true") {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />

        <Route
          path="/map"
          element={
            <MapSection
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
         {/* REPORT */}
        <Route
          path="/report"
          element={
            <AccidentReport
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
