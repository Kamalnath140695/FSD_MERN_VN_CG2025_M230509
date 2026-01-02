import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

function Alogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/admin/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/admin/home');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1>Login to Admin Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-signup">Log in</button>
        </form>
        <p className="login-link">
          Don't have an account? <a href="/adminsignup">Signup</a>
        </p>
      </div>
    </div>
  );
}

export default Alogin;