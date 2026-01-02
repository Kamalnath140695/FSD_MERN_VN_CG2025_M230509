import React, { useState } from 'react';
import axios from 'axios';

const Slogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/seller/login', formData);
      alert('Login successful!');
      localStorage.setItem('sellerToken', response.data.token);
      localStorage.setItem('sellerData', JSON.stringify(response.data.seller));
      setFormData({ email: '', password: '' });
      window.location.href = '/seller/home';
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F5F5DC',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        width: '400px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
          Login to Seller Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}>
              Email address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: '#8B4513',
              color: 'white',
              padding: '0.75rem 2rem',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer',
              marginBottom: '1rem'
            }}
          >
            Log in
          </button>
        </form>
        <p style={{ textAlign: 'center', color: '#666' }}>
          Don't have an account?{' '}
          <a href="/seller/signup" style={{ color: '#8B4513', textDecoration: 'none' }}>
            Signup
          </a>
        </p>
      </div>
    </div>
  );
};

export default Slogin;