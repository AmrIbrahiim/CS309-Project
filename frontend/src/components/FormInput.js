// Member 5: Reusable form field with inline validation error display
import React from "react";
import "./FormInput.css";

function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = false
}) {
  return (
    <div className="form-field">
      <label className="form-label" htmlFor={name}>
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`form-control ${error ? "form-control--error" : ""}`}
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}

export default FormInput;
