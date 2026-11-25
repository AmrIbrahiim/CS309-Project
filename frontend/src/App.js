// Member 1: Central application shell & screen switcher
// Week 2: Add tabs/routes here for Home, Listings, Reviews, and Cart without modifying Week 1 feature folders.
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import RegisterPage from "./features/register/RegisterPage";
import LoginPage from "./features/login/LoginPage";
import ProfilePage from "./features/profile/ProfilePage";
import { useUser } from "./context/UserContext";
import "./App.css";

function App() {
  const [activeScreen, setActiveScreen] = useState("register");
  const { loading } = useUser();

  return (
    <div className="app-shell">
      <Navbar activeScreen={activeScreen} onNavigate={setActiveScreen} />

      <main className="app-main">
        {loading ? (
          <p>Loading UniTrade...</p>
        ) : (
          <>
            {activeScreen === "register" && (
              <RegisterPage onSuccessNavigate={setActiveScreen} />
            )}
            {activeScreen === "login" && (
              <LoginPage onNavigate={setActiveScreen} />
            )}
            {activeScreen === "profile" && (
              <ProfilePage onNavigate={setActiveScreen} />
            )}
          </>
        )}
      </main>

      <footer className="app-footer">
        CS 309 • Project 10: UniTrade Campus Marketplace (Week 1 Account Screens)
      </footer>
    </div>
  );
}

export default App;
