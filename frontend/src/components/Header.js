import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import './Header.css';

const Header = () => {
  const { logout } = useApi();
  const [user, setUser] = useState(null)

  useEffect(() => { 
    const user = localStorage.getItem('user');
    if(user){
      setUser(JSON.parse(user));
    }else{
      setUser(null);
    }
  },[])
  
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    navigate('/login');
  };

console.log("User",user)

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
            {user? (
              <>
                {user?.role==="admin" ? (
                  <li>
                    <Link to="/admin-dashboard" className="admin-btn">
                     Dashboard
                    </Link>
                  </li>
                ):
                (
                  <li>
                    <Link to="/user-dashboard" className="admin-btn">
                       Dashboard
                    </Link>
                  </li>
                )
                }
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