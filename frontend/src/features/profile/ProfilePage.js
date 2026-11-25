// Member 4: Profile Component (Week 1 - 3 marks)
// Displays user profile layout and allows editing & saving account details with validation.
import React, { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { ROLE_LABELS } from "../../data/mockUsers";
import { validateProfileForm } from "../../utils/validators";
import FormInput from "../../components/FormInput";
import AlertMessage from "../../components/AlertMessage";
import "./ProfilePage.css";

function getInitials(name) {
  if (!name) return "U";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function ProfilePage({ onNavigate }) {
  const { activeUser, updateProfile, logout } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    department: "",
    role: "buyer",
    phone: "",
    meetupSpot: "",
    bio: ""
  });
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (activeUser) {
      setForm({
        name: activeUser.name || "",
        department: activeUser.department || "",
        role: activeUser.role || "buyer",
        phone: activeUser.phone || "",
        meetupSpot: activeUser.meetupSpot || "",
        bio: activeUser.bio || ""
      });
    }
  }, [activeUser]);

  if (!activeUser) {
    return (
      <section className="profile-card profile-empty">
        <h2 className="section-title">No Active Account</h2>
        <p className="section-subtitle">
          Log in with a registered account or create a new one to view and edit your profile.
        </p>
        <div className="profile-actions" style={{ justifyContent: "center" }}>
          <button
            type="button"
            className="primary-btn"
            onClick={() => onNavigate("login")}
          >
            Go to Login
          </button>
          <button
            type="button"
            className="secondary-btn"
            onClick={() => onNavigate("register")}
          >
            Register
          </button>
        </div>
      </section>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCancel = () => {
    setForm({
      name: activeUser.name || "",
      department: activeUser.department || "",
      role: activeUser.role || "buyer",
      phone: activeUser.phone || "",
      meetupSpot: activeUser.meetupSpot || "",
      bio: activeUser.bio || ""
    });
    setErrors({});
    setIsEditing(false);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setFeedback({ type: "", message: "" });

    const validationErrors = validateProfileForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFeedback({
        type: "error",
        message: "Please fix the validation errors before saving."
      });
      return;
    }

    setSaving(true);
    try {
      await updateProfile(activeUser._id, form);
      setIsEditing(false);
      setErrors({});
      setFeedback({
        type: "success",
        message: "Profile updated successfully!"
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.message || "Could not save profile changes."
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="profile-card">
      <div className="profile-header">
        <div className="profile-identity">
          <div className="profile-avatar" aria-hidden="true">
            {getInitials(activeUser.name)}
          </div>
          <div>
            <h2 className="profile-name">{activeUser.name}</h2>
            <p className="profile-email">{activeUser.email}</p>
          </div>
        </div>

        <div className="profile-actions">
          {!isEditing && (
            <button
              type="button"
              className="primary-btn"
              onClick={() => {
                setFeedback({ type: "", message: "" });
                setIsEditing(true);
              }}
            >
              Edit Profile
            </button>
          )}
          <button
            type="button"
            className="secondary-btn"
            onClick={() => {
              logout();
              onNavigate("login");
            }}
          >
            Switch Account
          </button>
        </div>
      </div>

      <AlertMessage type={feedback.type} message={feedback.message} />

      {!isEditing ? (
        <div className="profile-grid">
          <div className="profile-detail-box">
            <span className="profile-detail-label">Marketplace Role</span>
            <p className="profile-detail-value">
              {ROLE_LABELS[activeUser.role] || activeUser.role}
            </p>
          </div>

          <div className="profile-detail-box">
            <span className="profile-detail-label">Department / Faculty</span>
            <p className="profile-detail-value">{activeUser.department}</p>
          </div>

          <div className="profile-detail-box">
            <span className="profile-detail-label">Campus Contact Phone</span>
            <p className="profile-detail-value">
              {activeUser.phone || "Not provided yet"}
            </p>
          </div>

          <div className="profile-detail-box">
            <span className="profile-detail-label">Preferred Meetup Spot</span>
            <p className="profile-detail-value">
              {activeUser.meetupSpot || "Not specified"}
            </p>
          </div>

          <div className="profile-detail-box profile-detail-box--full">
            <span className="profile-detail-label">Marketplace Bio</span>
            <p className="profile-detail-value">
              {activeUser.bio || "No bio added yet. Click Edit Profile to add one."}
            </p>
          </div>
        </div>
      ) : (
        <form className="profile-form" onSubmit={handleSave} noValidate>
          <div className="profile-grid">
            <FormInput
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
              required
            />

            <FormInput
              label="Department / Faculty"
              name="department"
              value={form.department}
              onChange={handleChange}
              error={errors.department}
              required
            />

            <div className="form-field">
              <label className="form-label" htmlFor="profile-role">
                Marketplace Role *
              </label>
              <select
                id="profile-role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="form-control"
              >
                <option value="buyer">Student Buyer</option>
                <option value="seller">Student Seller</option>
                <option value="moderator">Moderator</option>
              </select>
            </div>

            <FormInput
              label="Campus Contact Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="e.g., 010-0000-0101"
              error={errors.phone}
            />
          </div>

          <FormInput
            label="Preferred Campus Meetup Spot"
            name="meetupSpot"
            value={form.meetupSpot}
            onChange={handleChange}
            placeholder="e.g., Faculty of Science Entrance"
            error={errors.meetupSpot}
          />

          <div className="form-field">
            <label className="form-label" htmlFor="bio">
              Marketplace Bio (max 240 chars)
            </label>
            <textarea
              id="bio"
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className={`form-control profile-textarea ${
                errors.bio ? "form-control--error" : ""
              }`}
              placeholder="Tell buyers/sellers what you usually trade or when you're on campus..."
            />
            {errors.bio && <span className="form-error">{errors.bio}</span>}
          </div>

          <div className="profile-actions">
            <button type="submit" className="primary-btn" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              className="secondary-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

export default ProfilePage;
