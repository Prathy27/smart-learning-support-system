import React, { useState } from 'react';
import "./Home1.css";
import boy from './assets/boy.png';
import Regis from './Regis';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

const Home1 = () => {
  const [openMode, setOpenModel] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);

  const navigate = useNavigate();
  return (
    
    <div className='hero'>
      
      <div className='hero-content'>
        <h3 className='mini-title'>Online</h3>
        <h1 className='main-title'>E-Learning</h1>
        <h2 className='sub-title'>Class For Kids</h2>

        <p className='description'>
          Welcome to Smart Learning Online Classes, a fun and creative learning world specially 
          designed for kids from classes 6 to 8. Here, every lesson is filled with exciting activities,
           colorful visuals, and simple explanations that make learning enjoyable and stress-free. 
           Our interactive quizzes, animated videos, and playful challenges help children understand 
           concepts quickly while keeping them engaged from start to finish. We believe every child is unique,
            so our platform encourages them to learn at their own pace and build confidence through 
          curiosity and exploration. With us, study time becomes a joyful adventure!
        </p>

       <div className='btn-group'>
          {/* Learn More → Go to Login page */}
          <button 
            className='btn learn' 
            onClick={() => navigate("/about")}
          >
            Learn more
          </button>

          {/* Open Register Pop-up */}
          <button 
            className='btn register' 
            onClick={() => setOpenModel(true)}
          >
            Register
          </button>

        
          <button className='btn login' onClick={() => setOpenLogin(true)}>
            Login
          </button>
        </div>

        {openMode && <Regis onClose={() => setOpenModel(false)} />}
           {openLogin && <Login onClose={() => setOpenLogin(false)} />} 
        </div>

        <div className='hero-image'>
          <img  src={boy} alt="boy" />
        </div>    
<div className='gap'>
<br></br>
<br></br>
</div>
{/* TRANSFORM SECTION */}
<section className="transform-section">
  <div className="transform-content">
    <h1>Transform Your <span>Learning Journey</span></h1>

    <p>
      Experience education reimagined with vibrant, modern design and 
      cutting-edge features. Join thousands of learners achieving their 
      goals through fun, interactive, and engaging lessons.
    </p>


  </div>
</section>


{/* STATS SECTION */}
<section className="stats-section">
  <div className="stat-card">
    <h2>10K+</h2>
    <p>Happy Students</p>
  </div>

  <div className="stat-card">
    <h2>500+</h2>
    <p>Interactive Lessons</p>
  </div>

  <div className="stat-card">
    <h2>100+</h2>
    <p>Expert Teachers</p>
  </div>

  <div className="stat-card">
    <h2>95%</h2>
    <p>Success Rate</p>
  </div>
</section>

<footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-section">
          <h2 className="footer-logo">Smart Learning</h2>
          <p>
            A fun and interactive online learning platform designed for kids
            from classes 3 to 8. Learn, explore, and grow with joy!
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Courses</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Learning */}
        <div className="footer-section">
          <h3>Learning</h3>
          <ul>
            <li>Interactive Quizzes</li>
            <li>Video Lessons</li>
            <li>Practice Tests</li>
            <li>Progress Tracking</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@smartlearning.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Smart Learning. All rights reserved.
      </div>
    </footer>
  </div>
  );
};

export default Home1;
//home page