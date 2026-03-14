import React, { useEffect, useState } from "react";
import AdminStudentScore from "./AdminStudentScore";

const API = "http://localhost:8088";

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/register/viewall`)
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error(err));
  }, []);

  if (selectedStudent) {
    return (
      <AdminStudentScore
        student={selectedStudent}
        onBack={() => setSelectedStudent(null)}
      />
    );
  }

  return (
    <div>
      <h2>ents</h2>

      <table style={{ width: "100%", marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.studentClass}</td>
              <td>{s.email}</td>
              <td>
                <button
                  onClick={() => setSelectedStudent(s)}
                  style={{
                    background: "#6366f1",
                    color: "#fff",
                    padding: "6px 12px",
                    border: "none",
                    borderRadius: 6,
                  }}
                >
                  View Score
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStudents;