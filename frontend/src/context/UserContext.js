// Member 1: Shared React state for Register, Login, and Profile in Week 1.
// Week 3: Extend this context with real authentication tokens and protected endpoints.

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  fetchUsers,
  registerUser,
  updateUserProfile
} from "../services/userService";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [dataSource, setDataSource] = useState("demo"); // "api" | "demo"
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchUsers().then(({ users: loadedUsers, source }) => {
      if (!mounted) return;
      setUsers(loadedUsers);
      setDataSource(source);
      if (loadedUsers.length > 0) {
        setActiveUser(loadedUsers[0]);
      }
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const handleRegister = async (formData) => {
    const created = await registerUser(formData, dataSource);
    setUsers((prev) => [created, ...prev]);
    setActiveUser(created);
    return created;
  };

  // Week 1 Mock Login: Matches email against loaded users without real authentication
  const handleMockLogin = (email) => {
    const normalized = email.trim().toLowerCase();
    const matched = users.find((u) => u.email.toLowerCase() === normalized);
    if (!matched) {
      throw new Error(
        "No account found with that email. Please register first or pick a demo account."
      );
    }
    setActiveUser(matched);
    return matched;
  };

  const handleUpdateProfile = async (userId, updates) => {
    const updated = await updateUserProfile(userId, updates, dataSource);
    setUsers((prev) =>
      prev.map((u) => (u._id === userId ? updated : u))
    );
    setActiveUser(updated);
    return updated;
  };

  const handleLogout = () => {
    setActiveUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        activeUser,
        dataSource,
        loading,
        register: handleRegister,
        login: handleMockLogin,
        updateProfile: handleUpdateProfile,
        logout: handleLogout,
        selectActiveUser: setActiveUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used inside a UserProvider");
  }
  return ctx;
}
