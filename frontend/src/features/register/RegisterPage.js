// Member 2: Register Component (Week 1 - 4 marks)
// Adapted from CS309_Student_Registration_Lab/frontend/src/App.js
import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import { validateRegisterForm } from "../../utils/validators";
import FormInput from "../../components/FormInput";
import AlertMessage from "../../components/AlertMessage";
import "./RegisterPage.css";

const EMPTY_FORM = {
  name: "",
  email: "",
  department: "",
  role: "buyer",
  phone: "",
  meetupSpot: "",
  password: "",
  confirmPassword: ""
};

function RegisterPage({ onSuccessNavigate }) {
  const { register } = useUser();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback({ type: "", message: "" });

    const validationErrors = validateRegisterForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFeedback({
        type: "error",
        message: "Please fix the highlighted fields before registering."
      });
      return;
    }

    setSubmitting(true);
    try {
      await register(form);
      setForm(EMPTY_FORM);
      setErrors({});
      setFeedback({
        type: "success",
        message: "Account registered successfully! You can now view or edit your Profile."
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.message || "Registration failed."
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-layout">
      <section className="register-card">
        <h2 className="section-title">Create UniTrade Account</h2>
        <p className="section-subtitle">
          Join your campus marketplace to buy or sell textbooks, electronics, and supplies.
        </p>

        <AlertMessage type={feedback.type} message={feedback.message} />

        <form className="register-form" onSubmit={handleSubmit} noValidate>
          <FormInput
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g., Karim Mahmoud"
            error={errors.name}
            required
          />

          <FormInput
            label="University Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="e.g., karim@campus.edu"
            error={errors.email}
            required
          />

          <div className="register-row">
            <FormInput
              label="Department / Faculty"
              name="department"
              value={form.department}
              onChange={handleChange}
              placeholder="e.g., Computer Science"
              error={errors.department}
              required
            />

            <div className="form-field">
              <label className="form-label" htmlFor="role">
                Marketplace Role *
              </label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className={`form-control ${errors.role ? "form-control--error" : ""}`}
              >
                <option value="buyer">Student Buyer</option>
                <option value="seller">Student Seller</option>
                <option value="moderator">Moderator</option>
              </select>
              {errors.role && <span className="form-error">{errors.role}</span>}
            </div>
          </div>

          <div className="register-row">
            <FormInput
              label="Campus Contact Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="e.g., 010-0000-0404"
              error={errors.phone}
            />

            <FormInput
              label="Preferred Meetup Spot"
              name="meetupSpot"
              value={form.meetupSpot}
              onChange={handleChange}
              placeholder="e.g., Main Library"
              error={errors.meetupSpot}
            />
          </div>

          <div className="register-row">
            <FormInput
              label="Password (Week 1 UI Validation)"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Min. 6 characters"
              error={errors.password}
              required
            />

            <FormInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              error={errors.confirmPassword}
              required
            />
          </div>

          <button
            type="submit"
            className="register-submit-btn"
            disabled={submitting}
          >
            {submitting ? "Registering..." : "Register Account"}
          </button>

          {feedback.type === "success" && onSuccessNavigate && (
            <button
              type="button"
              className="secondary-btn"
              onClick={() => onSuccessNavigate("profile")}
            >
              Go to Profile
            </button>
          )}
        </form>
      </section>
    </div>
  );
}

export default RegisterPage;
