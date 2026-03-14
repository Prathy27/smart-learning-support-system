import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminStudents from "./AdminStudents";
import AdminAddQuiz from "./AdminAddQuiz";

const AdminLayout = () => {
  const [active, setActive] = useState("students");

  const renderContent = () => {
    switch (active) {
      case "students":
        return <AdminStudents />;
      case "addQuiz":
        return <AdminAddQuiz />;
      default:
        return <AdminStudents />;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f4f6fb" }}>
      <AdminSidebar active={active} setActive={setActive} />
      <div style={{ flex: 1, padding: 30 }}>{renderContent()}</div>
    </div>
  );
};

export default AdminLayout;