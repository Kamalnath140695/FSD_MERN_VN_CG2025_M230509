import React, { useState, useEffect } from 'react';
import OrderItem from './OrderItem';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    fetchOrders();
    // Get user name from localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    window.location.href = '/user/login';
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        setError('Please login to view your orders');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:8000/api/user/orders', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError('Session expired. Please login again.');
          localStorage.removeItem('userToken');
          localStorage.removeItem('userData');
        } else if (response.status === 403) {
          setError('Access denied. Please check your permissions.');
        } else {
          setError(`Failed to fetch orders (${response.status})`);
        }
        setLoading(false);
        return;
      }

      const data = await response.json();
      
      // Transform the data to match the expected format
      const transformedOrders = data.map(order => ({
        id: order._id,
        productName: order.items.map(item => item.title || item.bookId?.title).join(', '),
        address: `${order.shippingAddress?.flatno || ''}, ${order.shippingAddress?.city || ''}, ${order.shippingAddress?.state || ''} (${order.shippingAddress?.pincode || ''}), ${order.shippingAddress?.state || ''}`,
        seller: order.items[0]?.bookId?.sellerId?.name || 'N/A',
        bookingDate: new Date(order.bookingDate).toLocaleDateString(),
        deliveryBy: new Date(order.deliveryDate).toLocaleDateString(),
        price: `₹${order.totalAmount}`,
        status: order.status,
        image: order.items[0]?.bookId?.image || '/api/placeholder/80/120'
      }));
      
      setOrders(transformedOrders);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(`Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
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
          My Orders
        </h1>
        
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>Loading your orders...</p>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
              <p>{error}</p>
              {error.includes('login') && (
                <a href="/user/login" style={{ color: '#8B4513', textDecoration: 'underline' }}>
                  Go to Login
                </a>
              )}
            </div>
          ) : orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>You haven't placed any orders yet.</p>
              <a href="/books" style={{ color: '#8B4513', textDecoration: 'underline' }}>
                Browse Books
              </a>
            </div>
          ) : (
            orders.map(order => (
              <OrderItem key={order.id} order={order} />
            ))
          )}
        </div>
      </div>

      <footer style={{
        backgroundColor: '#F5F5DC',
        padding: '2rem',
        textAlign: 'center',
        borderTop: '1px solid #ddd'
      }}>
        <button style={{
          backgroundColor: '#8B4513',
          color: 'white',
          padding: '0.75rem 2rem',
          border: 'none',
          borderRadius: '4px',
          fontSize: '1rem',
          cursor: 'pointer',
          marginBottom: '1rem'
        }}>
          Contact Us
        </button>
        <p style={{ color: '#666', fontStyle: 'italic', margin: '1rem 0' }}>
          "Embark on a literary journey with our book haven – where every page turns into an adventure!"
        </p>
        <p style={{ color: '#666', margin: '0.5rem 0' }}>
          📞 Call At: 127-865-586-67
        </p>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>
          © 2025 <strong>BookVerse</strong>. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default MyOrders;