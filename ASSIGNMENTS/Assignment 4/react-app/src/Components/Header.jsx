import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h2>TechCollege</h2>
        </div>
        <nav className="nav">
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={location.pathname === '/about' ? 'nav-link active' : 'nav-link'}
          >
            About
          </Link>
          <Link 
            to="/departments" 
            className={location.pathname === '/departments' ? 'nav-link active' : 'nav-link'}
          >
            Departments
          </Link>
          <Link 
            to="/contact" 
            className={location.pathname === '/contact' ? 'nav-link active' : 'nav-link'}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;