
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import "./Subject.css";
import subjectData from "./subjectData";
import Sidebar from "./Sidebar";
import UnitCards from "./UnitCards";

const SubjectByClass = () => {
  const { classId } = useParams();
  const navigate = useNavigate();

  const subjects = subjectData[String(classId)];

  const [selectedSubject, setSelectedSubject] = useState(subjects ? subjects[0] : null);

  // update selectedSubject when classId or subjects change
  useEffect(() => {
    const subs = subjectData[String(classId)];
    setSelectedSubject(subs ? subs[0] : null);
  }, [classId]);

  if (!subjects) {
    return <h2>Invalid Class Selected</h2>;
  }

  return (
    <div className="subject-container">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Subjects for Class {classId}</h1>
             </div>

      <div className="class-layout">
        <Sidebar subjects={subjects} selectedSubject={selectedSubject} onSelect={setSelectedSubject} />

        <main className="class-content">
          <UnitCards classId={classId} subject={selectedSubject} />
        </main>
      </div>
    </div>
  );
};

export default SubjectByClass;

// side bar that display each subjects ->css subject.css