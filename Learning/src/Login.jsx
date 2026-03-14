
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Regiss.css";

const Login = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
      // ✅ Always clear old session first
    localStorage.clear();

    // ================= ADMIN LOGIN =================
    if (email === "admin@gmail.com" && password === "admin") {
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("studentName", "Admin");
navigate("/admin");
      // alert("Admin login successful");

      // if (onClose) onClose();
      // navigate("/admin");
      return;
    }

    // ================= STUDENT LOGIN =================
    try {
      const res = await fetch("http://localhost:8088/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        alert("Invalid email or password");
        return;
      }

      const data = await res.json();
      console.log("Login response:", data);

      // ✅ Save student session properly
    // ✅ Save student session properly
localStorage.setItem("userRole", "student");
localStorage.setItem("studentId", data.id);
localStorage.setItem("studentName", data.name);
localStorage.setItem("studentClass", data.studentClass);
localStorage.setItem("studentEmail", data.email);
      // alert("Login successful");


      // ✅ CLOSE MODAL (if opened from Home)
      // if (onClose) onClose();

      // ✅ REDIRECT TO SUBJECTS BY CLASS
      navigate(`/class/${data.studentClass}`);

    } catch (err) {
      console.error("Login error:", err);
      alert("Server error");
    }
  };

  return (
    <div className="regis-container">
      {onClose && (
        <button className="close-btn" onClick={onClose}>✖</button>
      )}

      <form className="regisform" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
// login details