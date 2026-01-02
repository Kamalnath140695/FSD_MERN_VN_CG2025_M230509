import React, { useState, useEffect } from 'react';

const Snavbar = () => {
  const [sellerName, setSellerName] = useState('Seller');

  useEffect(() => {
    const sellerData = localStorage.getItem('sellerData');
    if (sellerData) {
      const seller = JSON.parse(sellerData);
      setSellerName(seller.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('sellerToken');
    localStorage.removeItem('sellerData');
    window.location.href = '/seller/login';
  };
  return (
    <nav style={{
      backgroundColor: '#8B4513',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white'
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        BookStore (Seller)
      </div>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <a href="/seller/home" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
        <a href="/seller/products" style={{ color: 'white', textDecoration: 'none' }}>My Products</a>
        <a href="/seller/addbook" style={{ color: 'white', textDecoration: 'none' }}>Add Books</a>
        <a href="/seller/orders" style={{ color: 'white', textDecoration: 'none' }}>Orders</a>
        <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', textDecoration: 'none' }}>Logout</button>
        <span>({sellerName})</span>
      </div>
    </nav>
  );
};

export default Snavbar;