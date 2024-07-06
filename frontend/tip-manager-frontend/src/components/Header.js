import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logout successfully');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <header className="header">
      <div className="header-content">
        <h1>Tip Manager</h1>
        {isLoggedIn && (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
      <nav className="nav">
        <Link to="/">Home</Link>
        {!isLoggedIn && <Link to="/register">Register</Link>}
        {!isLoggedIn && <Link to="/login">Login</Link>}
        {isLoggedIn && <Link to="/tip-calculator">Tip Calculator</Link>}
        {isLoggedIn && <Link to="/tip-retrieval">Show Tips</Link>}
      </nav>
    </header>
  );
};

export default Header;
