const API = "http://localhost:8088/api/quiz";

export async function fetchQuiz(className, subject, unit) {
  const res = await fetch(`${API}/${className}/${subject}/${unit}`);
  if (!res.ok) throw new Error("Quiz not found");
  return res.json();
}

export async function submitQuiz(payload) {
  const res = await fetch(`${API}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Submit failed");
  return res.json();
}

export async function getStudentResults(email) {
  const res = await fetch(`${API}/results/${email}`);
  if (!res.ok) throw new Error("Failed to fetch results");
  return res.json();
}