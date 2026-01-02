import React, { useState, useEffect } from 'react';

const Uhome = () => {
  const [userName, setUserName] = useState('User');
  const [bestSellers, setBestSellers] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.name);
    }
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/user/books');
      const books = await response.json();
      
      // Get first 4 books for best sellers
      setBestSellers(books.slice(0, 4));
      // Get next 4 books for recommendations
      setRecommendations(books.slice(4, 8));
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    window.location.href = '/user/login';
  };

  return (
    <div style={{ backgroundColor: '#F5F5DC', minHeight: '100vh' }}>
      <nav style={{
        backgroundColor: '#8B4513',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          BookStore
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="/user/home" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="/user/products" style={{ color: 'white', textDecoration: 'none' }}>Books</a>
          <a href="/user/cart" style={{ color: 'white', textDecoration: 'none' }}>Cart</a>
          <a href="/user/orders" style={{ color: 'white', textDecoration: 'none' }}>My Orders</a>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', textDecoration: 'none' }}>Logout</button>
          <span>({userName})</span>
        </div>
      </nav>

      <div style={{ padding: '2rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '3rem', color: '#333' }}>
          Best Seller
        </h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2rem',
          marginBottom: '4rem',
          maxWidth: '1200px',
          margin: '0 auto 4rem auto'
        }}>
          {bestSellers.map(book => (
            <div key={book._id} style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <img
                src={book.itemImage || 'https://via.placeholder.com/200x300/8B4513/FFFFFF?text=Book+Cover'}
                alt={book.title}
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200x300/8B4513/FFFFFF?text=Book+Cover';
                }}
              />
              <div style={{ padding: '1rem' }}>
                <h3 style={{ margin: 0, color: '#333', fontSize: '0.9rem' }}>
                  {book.title.toUpperCase()}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <h1 style={{ textAlign: 'center', marginBottom: '3rem', color: '#333' }}>
          Top Recommendation
        </h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {recommendations.map(book => (
            <div key={book._id} style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <img
                src={book.itemImage || 'https://via.placeholder.com/200x300/8B4513/FFFFFF?text=Book+Cover'}
                alt={book.title}
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200x300/8B4513/FFFFFF?text=Book+Cover';
                }}
              />
              <div style={{ padding: '1rem' }}>
                <h3 style={{ margin: 0, color: '#333', fontSize: '0.9rem' }}>
                  {book.title.toUpperCase()}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Uhome;