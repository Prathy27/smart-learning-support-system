import React, { useEffect, useState } from "react";

const API = "http://localhost:8088";

const AdminStudentScore = ({ student, onBack }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
fetch(`${API}/api/quiz/results/${student.email}`)      .then(res => res.json())
      .then(data => setScores(data))
      .catch(err => console.error(err));
  }, [student.email]);

  return (
    <div>
      <button onClick={onBack}>⬅ Back</button>

      <h2>{student.name}'s Scores</h2>
      <p>Class: {student.studentClass}</p>
      <p>Email: {student.email}</p>

      <div style={{ marginTop: 20 }}>
        {scores.length === 0 ? (
          <p>No quiz attempts yet.</p>
        ) : (
          scores.map((s, i) => {
            const percent = Math.round((s.score / s.total) * 100);
            return (
              <div
                key={i}
                style={{
                  padding: 15,
                  marginBottom: 10,
                  background: "#fff",
                  borderRadius: 10,
                  boxShadow: "0 4px 20px rgba(0,0,0,.05)",
                }}
              >
                <strong>{s.subject.toUpperCase()}</strong> — {s.unit}
                <div>
                  {s.score} / {s.total} ({percent}%)
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminStudentScore;