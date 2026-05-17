import React from "react";
import AuthForm from "./AuthForm";

export default function LoginModal({ onClose, onLogin }) {
  const handleLogin = (user) => {
    onLogin(user);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content login-modal" style={{ background: "transparent", border: "none", boxShadow: "none" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "-40px", zIndex: 10, position: "relative" }}>
          <button className="icon-btn" onClick={onClose} style={{ color: "var(--text)" }}>✕</button>
        </div>
        <AuthForm onLogin={handleLogin} />
      </div>
    </div>
  );
}