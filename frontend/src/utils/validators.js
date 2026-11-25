// Member 5: Shared client-side form validation helpers for Week 1 screens

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email) {
  return EMAIL_REGEX.test(String(email || "").trim());
}

export function validateRegisterForm(values) {
  const errors = {};

  if (!values.name || values.name.trim().length < 3) {
    errors.name = "Full name must be at least 3 characters.";
  }

  if (!values.email || !isValidEmail(values.email)) {
    errors.email = "Enter a valid university email address (e.g., name@campus.edu).";
  }

  if (!values.department || values.department.trim().length < 2) {
    errors.department = "Department or faculty is required.";
  }

  if (!["buyer", "seller", "moderator"].includes(values.role)) {
    errors.role = "Please select a valid campus role.";
  }

  // Week 1: Password fields are validated on the frontend only (no real auth until Week 3)
  if (!values.password || values.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (values.phone && values.phone.trim().length < 8) {
    errors.phone = "Campus contact number must be at least 8 digits/characters.";
  }

  return errors;
}

export function validateLoginForm(values) {
  const errors = {};

  if (!values.email || !isValidEmail(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.password || values.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  return errors;
}

export function validateProfileForm(values) {
  const errors = {};

  if (!values.name || values.name.trim().length < 3) {
    errors.name = "Full name must be at least 3 characters.";
  }

  if (!values.department || values.department.trim().length < 2) {
    errors.department = "Department is required.";
  }

  if (!["buyer", "seller", "moderator"].includes(values.role)) {
    errors.role = "Please choose a valid role.";
  }

  if (values.phone && values.phone.trim().length < 8) {
    errors.phone = "Contact phone should be at least 8 characters.";
  }

  if (values.bio && values.bio.trim().length > 240) {
    errors.bio = "Bio must be 240 characters or fewer.";
  }

  return errors;
}
