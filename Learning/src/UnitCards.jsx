
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UnitCards.css";

const UnitCards = ({ classId: propClassId, subject: propSubject }) => {
  const params = useParams();
  const classId = propClassId || params.classId;
  const subject = propSubject || params.subject;
  const navigate = useNavigate();
  const [units, setUnits] = useState([]);

  // Optional short descriptions for specific units
  const descriptionMap = {
    "Algebra": "Basic algebra concepts: variables, expressions, simple equations.",
    "Fraction": "Fractions: representation, operations, and simplification.",
    "Equation": "Solving equations: linear equations and techniques.",
    "Chapter 1": "Introduction and key definitions.",
    "chapter1": "Introduction and key definitions.",
  };

  useEffect(() => {
    if (!classId || !subject) return;
    fetch(`http://localhost:8088/api/subjects/${classId}`)
      .then(res => res.json())
      .then(data => {
        // API is expected to return an object like { "Algebra": ["Unit1", ...], ... }
        const apiUnits = data && data[subject] ? data[subject] : null;
        if (apiUnits && apiUnits.length) {
          setUnits(apiUnits);
        } else {
          // Fallback local unit lists when backend is unavailable or empty
          const localUnitMap = {
            Algebra: ["Fraction", "Equation"],
            Geography: ["Globe", "Earth movements"],
            History: ["Unit1", "Unit2"],
            Maths: ["Chapter1", "Chapter2", "Chapter3"],
          };
          setUnits(localUnitMap[subject] || []);
        }
      })
      .catch(err => {
        console.error(err);
        const localUnitMap = {
          Algebra: ["Fraction", "Equation"],
          Geography: ["Globe", "Earth movements"],
          History: ["Unit1", "Unit2"],
          Maths: ["Chapter1", "Chapter2", "Chapter3"],
        };
        setUnits(localUnitMap[subject] || []);
      });
  }, [classId, subject]);

  return (
    <div className="unit-container">
      <h2 className="unit-title">{subject} - Units</h2>

      <div className="card-grid">
        {units.map((unit, index) => (
          <div
            className="unit-card"
            key={index}
            onClick={() =>
              navigate(`/class/${classId}/${subject}/${unit.toLowerCase().replace(/ /g, "")}`)
            }
            style={{ cursor: "pointer" }}
          >
            <h3>{unit}</h3>
            <p className="unit-desc">{(descriptionMap && descriptionMap[unit]) || `Watch video and explanation for ${unit}.`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnitCards;
//the cards that display the units on each selected subject
