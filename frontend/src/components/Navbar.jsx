import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, User, LogIn, Activity } from "lucide-react";

export default function Navbar({ theme, toggleTheme, user, onLoginClick, onLogout }) {
  const location = useLocation();

  return (
    <nav className="global-navbar">
      <div className="navbar-left">
        <Activity className="navbar-logo-icon" size={24} />
        <span className="navbar-logo-text">Leoni Schunk</span>
      </div>

      <div className="navbar-center">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
        <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>Dashboard</Link>
      </div>

      <div className="navbar-right">
        <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        
        {user ? (
          <div className="user-menu">
            <div className="user-avatar">
              <User size={16} />
            </div>
            <span className="username" title={user}>
              {user.includes('@') ? user.split('@')[0] : user}
            </span>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </div>
        ) : (
          <button className="icon-btn login-btn" onClick={onLoginClick} title="Login">
            <LogIn size={20} />
            <span>Login</span>
          </button>
        )}
      </div>
    </nav>
  );
}