// Member 6: API Service Layer adapted from CS309_Student_Registration_Lab/frontend/src/App.js
// Tries Express + MongoDB at http://localhost:5000/api/users first.
// If the backend is offline during Week 1 frontend-only testing, falls back cleanly to localStorage demo data.

import { INITIAL_DEMO_USERS } from "../data/mockUsers";

const API_URL = "http://localhost:5000/api/users";
const STORAGE_KEY = "unitrade_demo_users_v1";

function loadLocalUsers() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (err) {
    // ignore storage errors
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_USERS));
  return INITIAL_DEMO_USERS;
}

function saveLocalUsers(users) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    // ignore storage errors
  }
}

export async function fetchUsers() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Backend returned non-OK status");
    }
    const data = await response.json();
    return { users: data, source: "api" };
  } catch (error) {
    return { users: loadLocalUsers(), source: "demo" };
  }
}

export async function registerUser(userData, currentSource) {
  const payload = {
    name: userData.name.trim(),
    email: userData.email.trim().toLowerCase(),
    department: userData.department.trim(),
    role: userData.role,
    phone: (userData.phone || "").trim(),
    meetupSpot: (userData.meetupSpot || "Main Campus Library").trim(),
    bio: (userData.bio || "").trim()
  };

  if (currentSource === "api") {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  }

  // Local Demo Mode fallback (same duplicate-email rule as backend 409 check)
  const localUsers = loadLocalUsers();
  const exists = localUsers.some(
    (u) => u.email.toLowerCase() === payload.email
  );
  if (exists) {
    throw new Error("Email already exists");
  }

  const newUser = {
    _id: `demo-${Date.now()}`,
    ...payload
  };

  const updated = [newUser, ...localUsers];
  saveLocalUsers(updated);
  return newUser;
}

export async function updateUserProfile(userId, updates, currentSource) {
  const payload = {
    name: updates.name.trim(),
    department: updates.department.trim(),
    role: updates.role,
    phone: (updates.phone || "").trim(),
    meetupSpot: (updates.meetupSpot || "").trim(),
    bio: (updates.bio || "").trim()
  };

  if (currentSource === "api") {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Profile update failed");
    }

    return data;
  }

  const localUsers = loadLocalUsers();
  let updatedRecord = null;
  const nextUsers = localUsers.map((user) => {
    if (user._id === userId) {
      updatedRecord = { ...user, ...payload };
      return updatedRecord;
    }
    return user;
  });

  if (!updatedRecord) {
    throw new Error("User not found");
  }

  saveLocalUsers(nextUsers);
  return updatedRecord;
}
