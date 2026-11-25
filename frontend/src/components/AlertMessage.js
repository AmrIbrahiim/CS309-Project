// Member 5: Reusable feedback banner
import React from "react";
import "./AlertMessage.css";

function AlertMessage({ type = "info", message }) {
  if (!message) return null;
  return <div className={`alert-box alert-box--${type}`}>{message}</div>;
}

export default AlertMessage;
