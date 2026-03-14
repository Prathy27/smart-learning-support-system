import React from "react";
import { useNavigate } from "react-router-dom";

const AdminSidebar = ({ setActive }) => {
  const navigate = useNavigate();
  return (
    <div style={{
      width: "250px",
      background: "#2c3e50",
      color: "#fff",
      padding: "30px"
    }}>
      <h2>Admin Panel</h2>

      <div style={{ marginTop: "40px" }}>
        <p style={menuStyle} onClick={() => setActive("students")}>
          Registered Students
        </p>

        <p style={menuStyle} onClick={() => setActive("addQuiz")}>
          Add Quiz
        </p>

        <p
          style={menuStyle}
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          Logout
        </p>
      </div>
    </div>
  );
};

const menuStyle = {
  margin: "20px 0",
  cursor: "pointer",
  fontSize: "16px"
};

export default AdminSidebar;