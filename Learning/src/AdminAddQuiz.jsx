// import React, { useState } from "react";

// const API = "http://localhost:8088";

// const AdminAddQuiz = () => {
//   const [classId, setClassId] = useState("");
//   const [subject, setSubject] = useState("");
//   const [unit, setUnit] = useState("");

//   const [questions, setQuestions] = useState(
//     Array.from({ length: 10 }, () => ({
//       question: "",
//       options: ["", "", "", ""],
//       answer: 0,
//     }))
//   );

//   const handleChange = (index, field, value) => {
//     const updated = [...questions];
//     updated[index][field] = value;
//     setQuestions(updated);
//   };

//   const handleOptionChange = (qIndex, optIndex, value) => {
//     const updated = [...questions];
//     updated[qIndex].options[optIndex] = value;
//     setQuestions(updated);
//   };

//   const handleSubmit = async () => {

// const formattedQuestions = questions.map(q => ({
//  question: q.question,
//  option1: q.options[0],
//  option2: q.options[1],
//  option3: q.options[2],
//  option4: q.options[3],
//  correctAnswer: q.options[q.answer]
// }));

// const payload = {

//  studentId: email,

//  subject: subject,

//  unit: unit,

//  score: finalScore

// };

// const res = await fetch(`${API}/api/quiz/upload`, {
//  method: "POST",
//  headers: { "Content-Type": "application/json" },
//  body: JSON.stringify(payload),
// });

// if(res.ok){
//  alert("Quiz Added Successfully!");
// }else{
//  alert("Error saving quiz");
// }

// };
//   return (
//     <div>
//       <h2>Add Quiz</h2>

//       <input placeholder="Class" value={classId} onChange={e => setClassId(e.target.value)} />
//       <input placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
//       <input placeholder="Unit" value={unit} onChange={e => setUnit(e.target.value)} />

//       {questions.map((q, i) => (
//         <div key={i} style={{ marginTop: 20 }}>
//           <h4>Question {i + 1}</h4>

//           <input
//             placeholder="Question text"
//             value={q.question}
//             onChange={e => handleChange(i, "question", e.target.value)}
//           />

//           {q.options.map((opt, j) => (
//             <input
//               key={j}
//               placeholder={`Option ${j + 1}`}
//               value={opt}
//               onChange={e => handleOptionChange(i, j, e.target.value)}
//             />
//           ))}

//           <select
//             value={q.answer}
//             onChange={e => handleChange(i, "answer", Number(e.target.value))}
//           >
//             <option value={0}>Option 1</option>
//             <option value={1}>Option 2</option>
//             <option value={2}>Option 3</option>
//             <option value={3}>Option 4</option>
//           </select>
//         </div>
//       ))}

//       <button onClick={handleSubmit}>Submit Quiz</button>
//     </div>
//   );
// };

// export default AdminAddQuiz;
import React, { useState } from "react";
import { uploadQuiz } from "../api/quizService";

export default function AdminAddQuiz() {

  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [unit, setUnit] = useState("");

  const [questions, setQuestions] = useState(
    Array.from({ length: 10 }, () => ({
      question: "",
      options: ["", "", "", ""],
      correctIndex: 0,
    }))
  );

  const handleSubmit = async () => {

    const payload = {
      className,
      subject,
      unit,
      title: "Unit Test",
      questions,
    };

    try {
      await uploadQuiz(payload);
      alert("Quiz Uploaded Successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>Add Quiz</h2>

      <input placeholder="Class"
        onChange={e => setClassName(e.target.value)} />

      <input placeholder="Subject"
        onChange={e => setSubject(e.target.value)} />

      <input placeholder="Unit"
        onChange={e => setUnit(e.target.value)} />

      {questions.map((q, i) => (
        <div key={i}>
          <h4>Question {i + 1}</h4>

          <input
            placeholder="Question"
            onChange={e => {
              const copy = [...questions];
              copy[i].question = e.target.value;
              setQuestions(copy);
            }}
          />

          {q.options.map((opt, j) => (
            <input
              key={j}
              placeholder={`Option ${j + 1}`}
              onChange={e => {
                const copy = [...questions];
                copy[i].options[j] = e.target.value;
                setQuestions(copy);
              }}
            />
          ))}

          <select
            onChange={e => {
              const copy = [...questions];
              copy[i].correctIndex = Number(e.target.value);
              setQuestions(copy);
            }}
          >
            <option value={0}>Option 1</option>
            <option value={1}>Option 2</option>
            <option value={2}>Option 3</option>
            <option value={3}>Option 4</option>
          </select>
        </div>
      ))}

      <button onClick={handleSubmit}>Upload Quiz</button>
    </div>
  );
}