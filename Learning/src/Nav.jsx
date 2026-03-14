import React from "react";
import { useLocation } from "react-router-dom";
import logo from "./assets/math.png";
import ProfileMenu from "./ProfileMenu";

const Nav = () => {
  const location = useLocation();
  const role = localStorage.getItem("userRole");

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="nav-logo">
        <img src={logo} alt="Smart Learning logo" className="nav-logo-img" />
        <span>Smart Learning</span>
      </div>

      {/* Right: Profile */}
      <div className="nav-profile">
        {location.pathname !== "/" && role !== "admin" && <ProfileMenu />}
      </div>

      <style>{`
        .navbar {
          width: 1520px;
          padding: 15px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          background: #fff;
          z-index: 1000;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          font-family: 'Poppins', sans-serif;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 24px;
          font-weight: 700;
          color: #ff6a00;
        }

        .nav-logo-img {
          width: 44px;
          height: 44px;
          object-fit: cover;
          border-radius: 8px;
        }

        .nav-profile {
          display: flex;
          align-items: center;
        }
      `}</style>
    </nav>
  );
};

export default Nav;
//the smart learning and the profile pic also have the profilemenu component on it 
