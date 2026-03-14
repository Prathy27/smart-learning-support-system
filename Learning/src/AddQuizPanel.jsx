import React, { useState } from "react";

const API = "http://localhost:8088";

export default function AddQuizPanel() {

  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [unit, setUnit] = useState("");

  const [questions, setQuestions] = useState(
    Array.from({ length: 10 }, () => ({
      question: "",
      options: ["", "", "", ""],
      correctIndex: 0
    }))
  );

  const handleSubmit = async () => {

    if (!className || !subject || !unit) {
      alert("Fill class, subject and unit");
      return;
    }

    const payload = {
      className,
      subject,
      unit,
      title: "Unit Test",
      questions
    };

    const res = await fetch(`${API}/api/quiz/upload`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert("Quiz Uploaded Successfully!");
    } else {
      alert("Upload failed");
    }
  };

  return (
    <div>
      <h2 style={{color:"black"}}>Add Quiz</h2>

      <select onChange={(e) => setClassName(e.target.value)}>
        <option value="">Select Class</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
      </select>

      <input
        placeholder="Enter Subject (e.g. science)"
        onChange={(e) => setSubject(e.target.value)}
      />

      <input
        placeholder="Enter Unit (e.g. light)"
        onChange={(e) => setUnit(e.target.value)}
      />

      {questions.map((q, i) => (
        <div key={i}>
          <h4 style={{color:"black"}}>Question {i + 1}</h4>

          <input
            placeholder="Question"
            onChange={(e) => {
              const copy = [...questions];
              copy[i].question = e.target.value;
              setQuestions(copy);
            }}
          />

          {q.options.map((opt, j) => (
            <input
              key={j}
              placeholder={`Option ${j + 1}`}
              onChange={(e) => {
                const copy = [...questions];
                copy[i].options[j] = e.target.value;
                setQuestions(copy);
              }}
            />
          ))}

          <select
            onChange={(e) => {
              const copy = [...questions];
              copy[i].correctIndex = Number(e.target.value);
              setQuestions(copy);
            }}
          >
            <option value={0}>Correct: Option 1</option>
            <option value={1}>Correct: Option 2</option>
            <option value={2}>Correct: Option 3</option>
            <option value={3}>Correct: Option 4</option>
          </select>
        </div>
      ))}

      <button onClick={handleSubmit}>Upload Quiz</button>
    </div>
  );
}