
import React from "react";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";

import Regis from "./Regis";
import Login from "./Login";
import Home1 from "./Home1";
import About from "./About";
import Contact from "./Contact";
import Nav from "./Nav";
import SubjectByClass from "./SubjectByClass";
import UnitCards from "./UnitCards";
import UnitContent from "./UnitContent";
import QuizPage from "./QuizPage";
import "./NoNav.css";
import Dashboard from "./dashboard";
// import ScorePage from "./ScorePage";
import AdminDashboard from "./AdminDashboard";

const RedirectToClass = () => {
  const studentClass = localStorage.getItem("studentClass");
  return studentClass
    ? <Navigate to={`/class/${studentClass}`} />
    : <Navigate to="/" />;
};


const AppRoutes = () => {
  const location = useLocation();
  // hide Nav on subject units page and unit content pages: /class/:classId/:subject and /class/:classId/:subject/:unit
  const hideNav = /^\/class\/[^\/]+\/[^\/]+(\/[^\/]+)?$/.test(location.pathname);

  return (
    <div className={hideNav ? "no-nav-page app-content" : "app-content"}>
     
      {!hideNav && <Nav />}
 
      <Routes>
        <Route path="/" element={<Home1 />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/register" element={<Regis />} />
        <Route path="/login" element={<Login />} />

        {/* Show subjects for a class */}
        <Route path="/class/:classId" element={<SubjectByClass />} />

        {/* Support legacy /subjects path by redirecting to stored class */}
        <Route path="/subjects" element={<RedirectToClass />} />

        {/* Show units for selected subject */}
        <Route path="/class/:classId/:subject" element={<UnitCards />} />
      
        {/* Show video for selected unit */}
        <Route path="/class/:classId/:subject/:unit" element={<UnitContent />} />
        <Route path="/class/:classId/:subject/:unit/quiz" element={<QuizPage />} />

<Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard/>} />
{/* <Route
  path="/scores/:classId/:subject"
  element={<ScorePage/>}


/> */}
<Route path="/class/:classId/:subject/:unit/quiz" element={<QuizPage />} />

      </Routes>
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
