// Member 3: Login Component (Week 1 - 3 marks)
// Validates form inputs and switches active demo user without real authentication (auth is Week 3).
import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import { ROLE_LABELS } from "../../data/mockUsers";
import { validateLoginForm } from "../../utils/validators";
import FormInput from "../../components/FormInput";
import AlertMessage from "../../components/AlertMessage";
import "./LoginPage.css";

function LoginPage({ onNavigate }) {
  const { users, login } = useUser();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFeedback({ type: "", message: "" });

    const validationErrors = validateLoginForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFeedback({
        type: "error",
        message: "Please enter a valid email and password."
      });
      return;
    }

    try {
      const user = login(form.email);
      setFeedback({
        type: "success",
        message: `Welcome back, ${user.name}! Redirecting to your Profile...`
      });
      setTimeout(() => {
        onNavigate("profile");
      }, 450);
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.message
      });
    }
  };

  const fillDemoUser = (email) => {
    setForm({ email, password: "demo-password" });
    setErrors({});
    setFeedback({ type: "", message: "" });
  };

  return (
    <div className="login-wrapper">
      <section className="login-card">
        <h2 className="section-title">Sign In to UniTrade</h2>
        <p className="section-subtitle">
          Week 1 account screen with form validation. Full backend authentication is scheduled for Week 3.
        </p>

        <AlertMessage type={feedback.type} message={feedback.message} />

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <FormInput
            label="University Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="name@campus.edu"
            error={errors.email}
            required
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter at least 6 characters"
            error={errors.password}
            required
          />

          <button type="submit" className="login-submit-btn">
            Login
          </button>
        </form>

        <div className="demo-shortcuts">
          <p className="demo-shortcuts-title">Quick-fill a registered demo account:</p>
          <div className="demo-btn-group">
            {users.slice(0, 3).map((u) => (
              <button
                key={u._id}
                type="button"
                className="demo-chip-btn"
                onClick={() => fillDemoUser(u.email)}
              >
                {u.name} ({ROLE_LABELS[u.role] || u.role})
              </button>
            ))}
          </div>
        </div>

        <p className="login-footer-note">
          New to UniTrade?{" "}
          <button
            type="button"
            className="inline-link-btn"
            onClick={() => onNavigate("register")}
          >
            Create an account
          </button>
        </p>
      </section>
    </div>
  );
}

export default LoginPage;
