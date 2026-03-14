import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileMenu.css";

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

const studentId = localStorage.getItem("studentId");
const role = localStorage.getItem("userRole");

useEffect(() => {

  if (role === "admin") {
      return;
    }

    // ✅ If not student → stop
    if (role !== "student" || !studentId) {
      return;
    }

    // ✅ Fetch student data safely
    fetch(`http://localhost:8088/api/register/${studentId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Student not found");
        return res.json();
      })
      .then((data) => setStudent(data))
      .catch((err) => console.error("Fetch error:", err));

  }, [studentId, role]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="profile-wrapper" ref={dropdownRef}>
      <div className="profile-circle" onClick={() => setOpen(!open)}>
        {student?.name
          ? student.name.charAt(0).toUpperCase()
          : "?"}
      </div>

      {open && (
        <div className="profile-dropdown">
          {student ? (
            <>
              <strong>{student.name}</strong>
              <div>Class {student.studentClass}</div>
              <hr />

              <button
                style={{ padding: "8px 14px", borderRadius: 8 }}
                onClick={() => navigate(`/dashboard`)}
              >
                Score
              </button>

              <button onClick={logout} style={{ color: "red" }}>
                Logout
              </button>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;