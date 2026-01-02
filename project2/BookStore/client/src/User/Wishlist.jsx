import React, { useState, useEffect } from 'react';

const Wishlist = () => {
  const [userName, setUserName] = useState('User');
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.name);
    }
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        setLoading(false);
        return;
      }
      
      const response = await fetch('http://localhost:8000/api/user/wishlist', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setWishlistItems(data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (bookId) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await fetch(`http://localhost:8000/api/user/wishlist/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        setWishlistItems(wishlistItems.filter(item => item.bookId._id !== bookId));
        alert('Book removed from wishlist!');
      }
    } catch (error) {
      alert('Failed to remove from wishlist');
    }
  };

  const handleAddToCart = async (bookId) => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        alert('Please login first');
        return;
      }
      
      const response = await fetch('http://localhost:8000/api/user/cart', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookId, quantity: 1 })
      });
      
      if (response.ok) {
        alert('Book added to cart!');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to add to cart');
      }
    } catch (error) {
      alert('Failed to add to cart');
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
          <a href="/wishlist" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Wishlist</a>
          <a href="/user/orders" style={{ color: 'white', textDecoration: 'none' }}>My Orders</a>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', textDecoration: 'none' }}>Logout</button>
          <span>({userName})</span>
        </div>
      </nav>

      <div style={{ padding: '2rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
          My Wishlist
        </h1>
        
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading wishlist...</p>
        ) : wishlistItems.length === 0 ? (
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <p style={{ color: '#666', fontSize: '1.2rem' }}>
              Your wishlist is empty
            </p>
            <p style={{ color: '#999', marginTop: '1rem' }}>
              Browse books and add them to your wishlist to see them here.
            </p>
            <a 
              href="/user/products" 
              style={{
                display: 'inline-block',
                marginTop: '2rem',
                backgroundColor: '#8B4513',
                color: 'white',
                padding: '0.75rem 2rem',
                textDecoration: 'none',
                borderRadius: '4px'
              }}
            >
              Browse Books
            </a>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {wishlistItems.map(item => (
              <div key={item._id} style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <img
                  src={item.bookId.itemImage || 'https://via.placeholder.com/200x300/8B4513/FFFFFF?text=Book+Cover'}
                  alt={item.bookId.title}
                  style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x300/8B4513/FFFFFF?text=Book+Cover';
                  }}
                />
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>
                    {item.bookId.title}
                  </h3>
                  <p style={{ margin: '0.25rem 0', color: '#666' }}>
                    <strong>Author:</strong> {item.bookId.author}
                  </p>
                  <p style={{ margin: '0.25rem 0', color: '#666' }}>
                    <strong>Genre:</strong> {item.bookId.genre}
                  </p>
                  <p style={{ margin: '0.5rem 0 1rem 0', color: '#333', fontSize: '1.1rem', fontWeight: 'bold' }}>
                    ₹{item.bookId.price}
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button 
                      onClick={() => handleAddToCart(item.bookId._id)}
                      style={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => handleRemoveFromWishlist(item.bookId._id)}
                      style={{
                        backgroundColor: '#dc3545',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;