import React, { useState, useEffect } from 'react';

const Products = () => {
  const [userName, setUserName] = useState('User');
  
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([]);
  
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.name);
    }
    fetchBooks();
    fetchWishlist();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/user/books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) return;
      
      const response = await fetch('http://localhost:8000/api/user/wishlist', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setWishlistItems(data.map(item => item.bookId._id));
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const handleAddToWishlist = async (bookId) => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        alert('Please login first');
        return;
      }
      
      const response = await fetch('http://localhost:8000/api/user/wishlist', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookId })
      });
      
      if (response.ok) {
        setWishlistItems([...wishlistItems, bookId]);
        alert('Book added to wishlist!');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to add to wishlist');
      }
    } catch (error) {
      alert('Failed to add to wishlist');
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
        setWishlistItems(wishlistItems.filter(id => id !== bookId));
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
          <a href="/wishlist" style={{ color: 'white', textDecoration: 'none' }}>Wishlist</a>
          <a href="/user/orders" style={{ color: 'white', textDecoration: 'none' }}>My Orders</a>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', textDecoration: 'none' }}>Logout</button>
          <span>({userName})</span>
        </div>
      </nav>

      <div style={{ padding: '2rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
          Books List
        </h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {loading ? (
            <p>Loading books...</p>
          ) : books.length === 0 ? (
            <p>No books available</p>
          ) : (
            books.map(book => (
              <div key={book._id} style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <img
                  src={book.itemImage || 'https://via.placeholder.com/200x300/8B4513/FFFFFF?text=Book+Cover'}
                  alt={book.title}
                  style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x300/8B4513/FFFFFF?text=Book+Cover';
                  }}
                />
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>
                    {book.title}
                  </h3>
                  <p style={{ margin: '0.25rem 0', color: '#666' }}>
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p style={{ margin: '0.25rem 0', color: '#666' }}>
                    <strong>Genre:</strong> {book.genre}
                  </p>
                  <p style={{ margin: '0.5rem 0 1rem 0', color: '#333', fontSize: '1.1rem', fontWeight: 'bold' }}>
                    ₹{book.price}
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button 
                      onClick={() => handleAddToCart(book._id)}
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
                      onClick={() => wishlistItems.includes(book._id) 
                        ? handleRemoveFromWishlist(book._id) 
                        : handleAddToWishlist(book._id)
                      }
                      style={{
                        backgroundColor: wishlistItems.includes(book._id) ? '#dc3545' : '#8B4513',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      {wishlistItems.includes(book._id) ? '♥' : '♡'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;