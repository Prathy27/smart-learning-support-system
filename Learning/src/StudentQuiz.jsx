import React, { useEffect, useState } from "react";
import { fetchQuiz, submitQuiz } from "../api/quizService";

export default function StudentQuiz({ className, subject, unit, student }) {

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetchQuiz(className, subject, unit)
      .then(data => {
        setQuestions(data);
        setAnswers(Array(data.length).fill(null));
      })
      .catch(err => alert(err.message));
  }, [className, subject, unit]);

  const handleSubmit = async () => {

    const payload = {
      studentEmail: student.email,
      studentName: student.name,
      className,
      subject,
      unit,
      answers,
    };

    const result = await submitQuiz(payload);
    alert(`Score: ${result.score}/${result.total}`);
  };

  return (
    <div>
      <h2>{subject} - {unit}</h2>

      {questions.map((q, i) => (
        <div key={q.id}>
          <p>{q.question}</p>

          {[q.option1, q.option2, q.option3, q.option4].map((opt, j) => (
            <div key={j}>
              <input
                type="radio"
                name={`q${i}`}
                onChange={() => {
                  const copy = [...answers];
                  copy[i] = j;
                  setAnswers(copy);
                }}
              />
              {opt}
            </div>
          ))}
        </div>
      ))}

      <button onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
}