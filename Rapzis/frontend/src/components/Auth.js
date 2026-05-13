import React, { useState } from "react";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      // LOGIN LOGIC (replace with backend later)
      if (
        formData.email === "admin@gmail.com" &&
        formData.password === "1234"
      ) {
        setMessage("✅ Login Successful");
        window.location.href = "/home"; // redirect
      } else {
        setMessage("❌ Invalid Credentials");
      }
    } else {
      // REGISTER LOGIC (replace with backend later)
      if (formData.name && formData.email && formData.password) {
        setMessage("✅ Registered Successfully");
        setIsLogin(true);
      } else {
        setMessage("❌ Fill all fields");
      }
    }
  };

  return (
    <section className="login-section">
      <div className="login-box">

        <h2>{isLogin ? "🔑 Login" : "📝 Register"}</h2>

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

        <p className="login-msg">{message}</p>

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
    </section>
  );
}

export default Auth;
