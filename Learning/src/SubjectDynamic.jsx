import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import UnitCards from "./UnitCards";
import "./SubjectDynamic.css";

const SubjectDynamic = () => {
  const [subjectsData, setSubjectsData] = useState({});
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    const classValue = localStorage.getItem("userClass");

    fetch(`http://localhost:8088/api/subjects/${classValue}`)
      .then((res) => res.json())
      .then((data) => {
        setSubjectsData(data);
        setSelectedSubject(Object.keys(data)[0]);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!selectedSubject) return <h2 className="loading">Loading...</h2>;

  return (
    <div className="subject-layout">
      <Sidebar
        subjects={Object.keys(subjectsData)}
        selectedSubject={selectedSubject}
        onSelect={setSelectedSubject}
      />

      <UnitCards
        title={selectedSubject}
        units={subjectsData[selectedSubject]}
      />
    </div>
  );
};

export default SubjectDynamic;
// 