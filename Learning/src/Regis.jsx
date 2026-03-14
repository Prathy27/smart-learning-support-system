import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Regiss.css";

const Regis = ({ onClose }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
  name: "",
  email: "",
  ph: "",
  date: "",
  password: "",
  confirmpassword: "",
  studentClass: "", // must match backend
});


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmpassword) {
    alert("Passwords do not match!");
    return;
  }

 const res = await fetch("http://localhost:8088/api/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});


  if (res.ok) {

    // Read saved record from backend
    const data = await res.json();

    // save class for redirect
    const classToSave = (data && data.studentClass) || form.studentClass;
    localStorage.setItem("userClass", classToSave);

    // also persist to localStorage 'students' so Admin can read when backend lacks GET
    try {
      const studentRecord = (data && typeof data === 'object') ? data : form;
      const existing = JSON.parse(localStorage.getItem('students') || '[]');
      existing.push(studentRecord);
      localStorage.setItem('students', JSON.stringify(existing));
    } catch (e) {
      // ignore localStorage write errors
    }

    alert("Registration Successful!");
   navigate(`/class/${data.studentClass}`);


   
  } else {
    alert("Registration Failed!");
  }

//////////////////////
// if (res.ok) {
//   const data = await res.json();

//   // SAVE CORRECTLY
//   localStorage.setItem("userClass", data.studentClass);

//   alert("Registration Successful!");
//   navigate(`/subjects`);
// }

};


  return (
    <div className="regis-container">
      <button className="close-btn" onClick={onClose}>✖</button>

      <form className="regisform" onSubmit={handleSubmit}>
        <h3>Register</h3>

        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={form.name}
          onChange={handleChange}
          required
        />
<select
  name="studentClass"
  value={form.studentClass}
  onChange={handleChange}
  required
  style={{
    width: "350px", 
    padding: "10px",
    borderRadius: "15px",
    border: "2px solid rgb(114,113,113)",
    backgroundColor: "white"
  }}
>
  <option value="">Select Class</option>
  <option value="6">6</option>
  <option value="7">7</option>
  <option value="8">8</option>
</select>


        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="ph"
          placeholder="Phone Number"
          value={form.ph}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmpassword"
          placeholder="Confirm Password"
          value={form.confirmpassword}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>

        <h3>Already have an account?</h3>
        <Link to="/login">Login</Link>
      </form>
    </div>
  );
};

export default Regis;
//registration page