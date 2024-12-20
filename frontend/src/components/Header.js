import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import './Header.css';

const Header = () => {
  const { isAuthenticated, user, logout } = useApi();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header>
      <div className="header-content">
        <div className="logo">
          <Link to="/" className="logo-link">
            <img src="/Logo.png" alt="Campus Connect Logo" />
            <span className="logo-text">Campus Connect</span>
          </Link>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/calendar">Calendar</Link></li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/dashboard" className="dashboard-btn">
                    Dashboard
                  </Link>
                </li>
                {user?.isAdmin && (
                  <li>
                    <Link to="/admin" className="admin-btn">
                      Admin Panel
                    </Link>
                  </li>
                )}
                <li>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="dashboard-btn">
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;