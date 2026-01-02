import React from 'react';
import { useLocation } from 'react-router-dom';
import './Admin.css';

function Anavbar() {
  const location = useLocation();
  const userName = 'Abhi';

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/admin/login';
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="admin-navbar">
      <div className="nav-brand">BookStore (Admin)</div>
      <div className="nav-links">
        <a 
          href="/admin/home" 
          className={isActive('/admin/home') ? 'active' : ''}
        >
          Home
        </a>
        <a 
          href="/admin/users" 
          className={isActive('/admin/users') ? 'active' : ''}
        >
          Users
        </a>
        <a 
          href="/admin/sellers" 
          className={isActive('/admin/sellers') ? 'active' : ''}
        >
          Sellers
        </a>
        <button onClick={handleLogout}>Logout</button>
        <span className="user-name">({userName})</span>
      </div>
    </nav>
  );
}

export default Anavbar;