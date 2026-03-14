import React, { useEffect, useState } from "react";
import { getStudentResults } from "../api/quizService";

export default function StudentScores({ email }) {

  const [results, setResults] = useState([]);

 useEffect(() => {
  const email = localStorage.getItem("studentEmail");
  getStudentResults(email)
    .then(setResults);
}, []);

  return (
    <div>
      <h2>My Scores</h2>

      {results.map((r, i) => (
        <div key={i}>
          <strong>{r.subject}</strong> - {r.unit}
          <div>{r.score} / {r.total}</div>
        </div>
      ))}
    </div>
  );
}