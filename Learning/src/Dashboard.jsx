import React, { useEffect, useState } from "react";

const API = "http://localhost:8088";

const Dashboard = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  const email = localStorage.getItem("studentEmail");
  const studentName = localStorage.getItem("studentName");

  useEffect(() => {
    if (!email) return;

    const fetchScores = async () => {
      try {
        const res = await fetch(`${API}/api/quiz/results/${email}`);

        if (!res.ok) {
          throw new Error("Failed to fetch scores");
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          setScores(data);
        } else {
          setScores([]);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching scores:", err);
        setScores([]);
        setLoading(false);
      }
    };

    fetchScores();
  }, [email]);

  if (!email) {
    return <div style={{ padding: 40 }}>Please login first.</div>;
  }

  if (loading) {
    return <div style={{ padding: 40 }}>Loading dashboard...</div>;
  }

  if (scores.length === 0) {
    return <div style={{ padding: 40 }}>No quiz attempts yet.</div>;
  }

  return (
    <div style={{ maxWidth: 1000, margin: "40px auto", padding: 20 }}>
      <h2>📊 Performance Dashboard</h2>
      <p>Welcome back, <strong>{studentName}</strong></p>

      {scores.map((s, index) => (
        <div key={index} style={{
          marginTop: 20,
          padding: 20,
          border: "1px solid #ddd",
          borderRadius: 10
        }}>
          <h3>{s.subject.toUpperCase()}</h3>
          <p>Unit: {s.unit}</p>
          <p>Score: {s.score} / {s.total}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
