import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UnitContent.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8088";

const UnitContent = () => {
  const { classId, subject, unit } = useParams();
  const navigate = useNavigate();

  const subjectKey = subject?.toLowerCase();
  const unitKey = unit?.toLowerCase();

  const [videoUrl, setVideoUrl] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/videos/${subjectKey}/${unitKey}`
        );

        if (res.ok) {
          const data = await res.json();
          setVideoUrl(data.videoUrl);
          setExplanation(data.explanation);
        } else {
          setVideoUrl(null);
          setExplanation(null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [subjectKey, unitKey]);

  const startQuiz = () => {
    navigate(`/class/${classId}/${subject}/${unit}/quiz`);
  };

  return (
    <div className="unit-page">
      <h1>{unit}</h1>

      {loading && <p>Loading...</p>}

      {!loading && videoUrl && (
        <>
          <iframe
            src={videoUrl}
            title="Video"
            width="100%"
            height="400"
            allowFullScreen
          />

          <p>{explanation}</p>

          <button onClick={startQuiz}>
            Take Test
          </button>
        </>
      )}

      {!loading && !videoUrl && (
        <p>No video available</p>
      )}
    </div>
  );
};

export default UnitContent;