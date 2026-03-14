import React, { useState } from "react";
import Sidebar from "./AdminSidebar";
import StudentsPanel from "./StudentsPanel";
import AddQuizPanel from "./AddQuizPanel";

const AdminDashboard = () => {
  const [active, setActive] = useState("students");

  const renderContent = () => {
    switch (active) {
      case "students":
        return <StudentsPanel />;
      case "addQuiz":
        return <AddQuizPanel />;
      default:
        return <StudentsPanel />;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar setActive={setActive} />
      <div style={{ flex: 1, padding: "30px", background: "#f4f6fb" }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;