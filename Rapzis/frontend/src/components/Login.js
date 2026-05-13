import React, { useState } from "react";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple demo validation
    if (email === "admin@gmail.com" && password === "1234") {
      setMessage("✅ Login Successful");
    } else {
      setMessage("❌ Invalid Credentials");
    }
  };

  return (
    <section id="login" className="login-section">

      <div className="login-box">

        <h2>🔑 Login</h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>

        </form>

        <p className="login-msg">{message}</p>

      </div>

    </section>
  );
}

export default Login;
