import React, { useEffect, useState } from "react";

const StudentsPanel = () => {

  const [students, setStudents] = useState([]);
  const [scores, setScores] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8088/api/register/viewall")
      .then(res => res.json())
      .then(data => setStudents(data));
  }, []);

  // ✅ FIXED VIEW SCORE
  const handleViewScore = async (email) => {
const res = await fetch(`http://localhost:8088/api/quiz/results/${email}`);    const data = await res.json();
    setScores(data);
    setSelectedEmail(email);
  };

  // ✅ REMOVE STUDENT (Frontend + Backend)
  const handleRemove = async (email) => {

    if (!window.confirm("Are you sure to delete this student?")) return;

    // delete from register table
    await fetch(`http://localhost:8088/api/register/${email}`, {
      method: "DELETE"
    });

    // delete scores
    await fetch(`http://localhost:8088/api/scores/student/${email}`, {
      method: "DELETE"
    });

    // update frontend
    setStudents(prev => prev.filter(s => s.email !== email));
    alert("Student removed successfully!");
  };

  return (
    <div>
      <h2 style={{color:"black"}}>Registered Students</h2>

      <table style={{ width: "100%", background: "#2c3e50" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th>Email</th>
            <th>View Score</th>
            <th>Remove</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s, index) => (
            <tr key={index}>
              <td>{s.name}</td>
              <td>{s.studentClass}</td>
              <td>{s.email}</td>

              <td>
                <button onClick={() => handleViewScore(s.email)}>
                  View Score
                </button>
              </td>

              <td>
                <button
                  style={{ background: "white", color: "#1c0909" }}
                  onClick={() => handleRemove(s.email)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ DISPLAY SUBJECT + UNIT + SCORE */}
      {selectedEmail && (
        <div style={{ marginTop: "30px" ,color:"black"}}>
          <h3>Scores for {selectedEmail}</h3>

          {scores.length === 0 ? (
            <p>No tests attempted</p>
          ) : (
            <ul>
              {scores.map((sc, i) => (
                <li key={i}>
                  Subject: <b>{sc.subject}</b> | 
                  Unit: <b>{sc.unit}</b> | 
                  Score: <b>{sc.score}/10</b>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentsPanel;