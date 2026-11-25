// Member 1: Top navigation switching between Week 1 screens (Register, Login, Profile)
import React from "react";
import { useUser } from "../context/UserContext";
import "./Navbar.css";

function Navbar({ activeScreen, onNavigate }) {
  const { activeUser, dataSource } = useUser();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <h1 className="navbar-title">UniTrade</h1>
          <span className="navbar-subtitle">Campus Marketplace • Week 1</span>
        </div>

        <nav className="navbar-links" aria-label="Main navigation">
          <button
            type="button"
            className={`nav-btn ${activeScreen === "register" ? "nav-btn--active" : ""}`}
            onClick={() => onNavigate("register")}
          >
            Register
          </button>

          <button
            type="button"
            className={`nav-btn ${activeScreen === "login" ? "nav-btn--active" : ""}`}
            onClick={() => onNavigate("login")}
          >
            Login
          </button>

          <button
            type="button"
            className={`nav-btn ${activeScreen === "profile" ? "nav-btn--active" : ""}`}
            onClick={() => onNavigate("profile")}
          >
            Profile {activeUser ? `(${activeUser.name.split(" ")[0]})` : ""}
          </button>

          <span
            className={`status-pill ${
              dataSource === "api" ? "status-pill--api" : "status-pill--demo"
            }`}
            title="Automatically uses Express + MongoDB when running, or local demo data otherwise"
          >
            {dataSource === "api" ? "API Connected" : "Demo Mode (Local)"}
          </span>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
