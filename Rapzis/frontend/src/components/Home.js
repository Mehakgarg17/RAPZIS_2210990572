import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import {
    LineChart, Line,
    BarChart, Bar,
    PieChart, Pie, Cell,
    XAxis, YAxis, Tooltip, Legend,
    ResponsiveContainer, CartesianGrid, LabelList
} from "recharts";

/* ================= DATA ================= */

const lineData = [
    { month: "Jan", accidents: 400 },
    { month: "Feb", accidents: 520 },
    { month: "Mar", accidents: 480 },
    { month: "Apr", accidents: 610 },
    { month: "May", accidents: 720 },
    { month: "Jun", accidents: 680 }
];

const barData = [
    { type: "Minor", value: 900 },
    { type: "Major", value: 500 },
    { type: "Fatal", value: 250 }
];

const pieData = [
    { name: "Rain", value: 400 },
    { name: "Clear", value: 250 },
    { name: "Fog", value: 650 }
];

const COLORS = ["#ef4444", "#facc15", "#22c55e"];

/* ================= AUTH COMPONENT ================= */

function AuthBox({ onLogin }) {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isLogin) {
                // LOGIN API
                const res = await fetch("http://localhost:5000/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: form.email,
                        password: form.password
                    })
                });

                const data = await res.json();

                if (res.ok) {
                    setMessage("✅ Login Successful");
                    localStorage.setItem("isLoggedIn", "true");
                    onLogin();
                } else {
                    setMessage("❌ " + data.message);
                }

            } else {
                // REGISTER API
                const res = await fetch("http://localhost:5000/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form)
                });

                const data = await res.json();

                if (res.ok) {
                    setMessage("✅ Registered Successfully");
                    setIsLogin(true);
                } else {
                    setMessage("❌ " + data.message);
                }
            }

        } catch (err) {
            setMessage("❌ Server error");
        }
    };

    return (
        <div className="auth-box">
            <h3>{isLogin ? "Login" : "Register"}</h3>

            <form onSubmit={handleSubmit}>

                {!isLogin && (
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        onChange={handleChange}
                        required
                    />
                )}

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    {isLogin ? "Login" : "Register"}
                </button>
            </form>

            <p className="auth-msg">{message}</p>

            <p
                className="toggle-auth"
                onClick={() => {
                    setIsLogin(!isLogin);
                    setMessage("");
                }}
            >
                {isLogin
                    ? "Don't have an account? Register"
                    : "Already have an account? Login"}
            </p>
        </div>
    );
}


function Home({ isLoggedIn, setIsLoggedIn }) {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    /* Disable scroll until login */
    useEffect(() => {
        document.body.style.overflow = isLoggedIn ? "auto" : "hidden";
    }, [isLoggedIn]);
    const [uiMessage, setUiMessage] = useState("");

    const handleNavigation = (id) => {
        if (!isLoggedIn) {
            setUiMessage("🔒 Please login to explore the website");
            return;
        }

        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
            setUiMessage("");
        }
    };

    return (
        <div className="dashboard">

            {/* ================= SIDEBAR ================= */}
            <div className="sidebar">

                <div className="logo">🚦 RAPZIS</div>

                <ul className="menu">
                    <li onClick={() => handleNavigation("home")}>🏠 Home</li>
                    {/* <li onClick={() => handleNavigation("map")}>🗺 Map</li>
                     */}
                    <li onClick={() => {
                        if (!isLoggedIn) {
                            setUiMessage("🔒 Please login first");
                            return;
                        }
                        navigate("/map");
                    }}>
                        🗺 Map
                    </li>
<li onClick={() => {
                        if (!isLoggedIn) {
                            setUiMessage("🔒 Please login first");
                            return;
                        }
                        navigate("/report");
                    }}>
                        📝 Report
                    </li>

                    <li onClick={() => handleNavigation("analytics")}>📊 Analytics</li>
                    
                    <li onClick={() => handleNavigation("about")}>ℹ️ About</li>
                </ul>

                <div className="sidebar-bottom">
                    <div className="profile">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            alt="profile"
                        />
                        <span>User</span>
                    </div>

                    <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>
                        Logout
                    </button>
                </div>

            </div>

            {/* ================= MAIN CONTENT ================= */}
            <div className={`main-content ${!isLoggedIn ? "blurred" : ""}`}>

                <section id="home" className="hero">
                    <h1>🚦 RAPZIS</h1>
                    <h2>Road Accident Prediction & Zone Identification System</h2>
                    <p>Analyze Accident Hotspots & Predict Risk Using Machine Learning</p>

                    {/* AUTH SECTION */}
                    <AuthBox onLogin={() => setIsLoggedIn(true)} />
                    {uiMessage && <p className="login-warning">{uiMessage}</p>}
                </section>


                {/* ================= STATS ================= */}
                <section id="analytics" className="stats-section">

                    <h2>📊 Analytics Dashboard</h2>

                    {/* STAT CARDS */}
                    <div className="stats-grid">

                        <div className="stat-card">
                            <h3>Total Accidents</h3>
                            <h1>12,450</h1>

                            <ResponsiveContainer width="100%" height={80}>
                                <LineChart data={lineData}>
                                    <Line
                                        type="monotone"
                                        dataKey="accidents"
                                        stroke="#ef4444"
                                        strokeWidth={3}
                                        dot={false}
                                        animationDuration={1500}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="stat-card">
                            <h3>High Risk Zones</h3>
                            <h1>34</h1>

                            <ResponsiveContainer width="100%" height={80}>
                                <LineChart data={lineData}>
                                    <Line
                                        type="monotone"
                                        dataKey="accidents"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        dot={false}
                                        animationDuration={1500}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                    </div>

                    {/* CHARTS */}
                    <div className="charts-grid">

                        {/* LINE CHART */}
                        <div className="chart-box">
                            <h3>📈 Monthly Accident Trend</h3>

                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={lineData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />

                                    <XAxis dataKey="month" stroke="#ccc" />
                                    <YAxis stroke="#ccc" />

                                    <Tooltip contentStyle={{ background: "#1e293b", border: "none" }} />
                                    <Legend />

                                    <Line
                                        type="monotone"
                                        dataKey="accidents"
                                        stroke="#ef4444"
                                        strokeWidth={3}
                                        animationDuration={2000}
                                        name="Number of Accidents"
                                    />
                                </LineChart>
                            </ResponsiveContainer>

                            {/* Explanation */}
                            <div className="chart-info">
                                <p><strong>Insight:</strong> Accidents show an increasing trend from Jan to May, indicating rising risk.</p>
                                <p><strong>Peak Month:</strong> May (720 accidents)</p>
                                <p><strong>Use Case:</strong> Helps authorities plan preventive measures during high-risk months.</p>
                            </div>
                        </div>


                        {/* BAR CHART */}
                        <div className="chart-box">
                            <h3>🚗 Accident Severity Distribution</h3>

                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={barData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                    <XAxis dataKey="type" stroke="#ccc" />
                                    <YAxis stroke="#ccc" />

                                    <Tooltip contentStyle={{ background: "#1e293b", border: "none" }} />
                                    <Legend />

                                    <Bar
                                        dataKey="value"
                                        fill="#3b82f6"
                                        radius={[10, 10, 0, 0]}
                                        animationDuration={2000}
                                        name="Number of Cases"
                                    >
                                        <LabelList dataKey="value" position="top" fill="#fff" />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>

                            {/* Explanation */}
                            <div className="chart-info">
                                <p><strong>Insight:</strong> Most accidents are minor, but fatal cases still represent a critical concern.</p>
                                <p><strong>Highest Category:</strong> Minor (900 cases)</p>
                                <p><strong>Use Case:</strong> Helps in resource allocation (ambulance, trauma centers).</p>
                            </div>
                        </div>


                        {/* PIE CHART */}
                        <div className="chart-box">
                            <h3>🌧 Weather Impact on Accidents</h3>

                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>

                                    <Pie
                                        data={pieData}
                                        dataKey="value"
                                        outerRadius={100}
                                        label={({ name, percent }) =>
                                            `${name} (${(percent * 100).toFixed(0)}%)`
                                        }
                                        animationDuration={2000}
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={index} fill={COLORS[index]} />
                                        ))}
                                    </Pie>

                                    <Tooltip contentStyle={{ background: "#1e293b", border: "none" }} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>

                            {/* Explanation */}
                            <div className="chart-info">
                                <p><strong>Insight:</strong> Fog conditions contribute to the highest number of accidents.</p>
                                <p><strong>Highest Risk Weather:</strong> Fog (650 cases)</p>
                                <p><strong>Use Case:</strong> Useful for issuing weather-based traffic alerts.</p>
                            </div>
                        </div>

                        {!isLoggedIn && (
                            <div className="login-overlay">
                                🔒 Login to explore the website
                            </div>
                        )}
                    </div>

                </section>

                {/* ================= ABOUT ================= */}
                <section id="about" className="about">
                    <h2>About RAPZIS</h2>
                    <p>
                        RAPZIS (Road Accident Prediction & Zone Identification System) is an
                        intelligent web-based platform designed to analyze road accident data
                        and identify high-risk zones using advanced Machine Learning and GIS
                        (Geographic Information Systems).
                    </p>
                    <p>
                        The system processes historical accident datasets and extracts meaningful
                        patterns related to time, weather conditions, accident severity, and
                        geographical locations. By applying predictive models, RAPZIS can forecast
                        accident-prone areas and help authorities take preventive actions.
                    </p>
                    <p>
                        RAPZIS aims to assist government agencies, traffic management authorities,
                        and urban planners in enhancing road safety, reducing accident rates, and
                        ultimately saving lives by enabling data-driven decision making.
                    </p>
                </section>

                {/* ================= FOOTER ================= */}
                <footer className="footer">

                    <div className="footer-container">

                        {/* LEFT */}
                        <div className="footer-left">
                            <h3>🚦 RAPZIS</h3>
                            <p>
                                Road Accident Prediction & Zone Identification System using
                                Machine Learning & GIS for safer roads.
                            </p>
                        </div>

                        {/* CENTER */}
                        <div className="footer-center">
                            <h4>Quick Links</h4>
                            <ul>
                                <li onClick={() => handleNavigation("home")}>Home</li>
                                <li onClick={() => handleNavigation("analytics")}>Analytics</li>
                                <li onClick={() => handleNavigation("about")}>About</li>
                            </ul>
                        </div>

                        {/* RIGHT */}
                        <div className="footer-right">
                            <h4>Contact</h4>
                            <p>📧 gargmehak839@gmail.com</p>
                            <p>📍 India</p>

                            <div className="socials">
                                <a href="#">🔗 LinkedIn</a>
                                <a href="#">💻 GitHub</a>
                            </div>
                        </div>

                    </div>

                    {/* BOTTOM */}
                    <div className="footer-bottom">
                        <p>© 2026 RAPZIS | Designed by Mehak Garg</p>
                    </div>

                </footer>


            </div>
        </div>
    );
}

export default Home;
