import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchQuiz, submitQuiz } from "./quizService";

export default function QuizPage() {

  // ✅ ALWAYS DECLARE useParams FIRST
  const { classId, subject, unit } = useParams();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  // ================= FETCH QUIZ =================
  useEffect(() => {

    if (!classId || !subject || !unit) return;

    fetchQuiz(classId, subject, unit)
      .then(data => {
        setQuestions(data);
        setAnswers(Array(data.length).fill(null));
      })
      .catch(err => {
        console.error(err);
        alert("Quiz not found");
      });

  }, [classId, subject, unit]);

  // ================= SUBMIT =================
 const handleSubmit = async () => {

  if (answers.includes(null)) {
    alert("Please answer all questions");
    return;
  }

  const payload = {
    studentEmail: localStorage.getItem("studentEmail"),
    studentName: localStorage.getItem("studentName"),
    className: classId,
    subject,
    unit,
    answers
  };

  try {
    const result = await submitQuiz(payload);
    alert(`Score: ${result.score}/${result.total}`);
  } catch (err) {
    console.error(err);
    alert("Submit failed");
  }
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

      {questions.length > 0 && (
        <button onClick={handleSubmit}>
          Submit Quiz
        </button>
      )}
    </div>
  );
}