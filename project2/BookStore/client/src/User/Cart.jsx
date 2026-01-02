import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [userName, setUserName] = useState('User');
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    flatno: '',
    city: '',
    state: '',
    pincode: ''
  });

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.name);
    }
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:8000/api/user/cart', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (bookId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      const token = localStorage.getItem('userToken');
      await fetch('http://localhost:8000/api/user/cart', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookId, quantity: newQuantity })
      });
      fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeFromCart = async (bookId) => {
    try {
      const token = localStorage.getItem('userToken');
      await fetch(`http://localhost:8000/api/user/cart/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.bookId.price * item.quantity), 0);
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const items = cartItems.map(item => ({
        bookId: item.bookId._id,
        quantity: item.quantity
      }));

      const response = await fetch('http://localhost:8000/api/user/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items, shippingAddress })
      });

      if (response.ok) {
        alert('Order placed successfully!');
        setCartItems([]);
        setShowCheckout(false);
        window.location.href = '/user/orders';
      } else {
        alert('Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    window.location.href = '/user/login';
  };

  if (showCheckout) {
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
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>Logout</button>
            <span>({userName})</span>
          </div>
        </nav>

        <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
            Checkout
          </h1>

          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', marginBottom: '2rem' }}>
            <h3>Order Summary</h3>
            {cartItems.map(item => (
              <div key={item.bookId._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span>{item.bookId.title} x {item.quantity}</span>
                <span>₹{item.bookId.price * item.quantity}</span>
              </div>
            ))}
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
              <span>Total: ₹{calculateTotal()}</span>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px' }}>
            <h3>Shipping Address</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <input
                type="text"
                placeholder="Flat/House No."
                value={shippingAddress.flatno}
                onChange={(e) => setShippingAddress({...shippingAddress, flatno: e.target.value})}
                style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <input
                type="text"
                placeholder="City"
                value={shippingAddress.city}
                onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <input
                type="text"
                placeholder="State"
                value={shippingAddress.state}
                onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <input
                type="text"
                placeholder="Pincode"
                value={shippingAddress.pincode}
                onChange={(e) => setShippingAddress({...shippingAddress, pincode: e.target.value})}
                style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button
                onClick={() => setShowCheckout(false)}
                style={{
                  backgroundColor: '#666',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Back to Cart
              </button>
              <button
                onClick={handleCheckout}
                style={{
                  backgroundColor: '#8B4513',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>Logout</button>
          <span>({userName})</span>
        </div>
      </nav>

      <div style={{ padding: '2rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
          Shopping Cart
        </h1>

        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading cart...</p>
        ) : cartItems.length === 0 ? (
          <div style={{ textAlign: 'center' }}>
            <p>Your cart is empty</p>
            <a href="/user/products" style={{ color: '#8B4513', textDecoration: 'none' }}>
              Continue Shopping
            </a>
          </div>
        ) : (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {cartItems.map(item => (
              <div key={item.bookId._id} style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                marginBottom: '1rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <img
                  src={item.bookId.itemImage || 'https://via.placeholder.com/100x150/8B4513/FFFFFF?text=Book'}
                  alt={item.bookId.title}
                  style={{ width: '80px', height: '120px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/100x150/8B4513/FFFFFF?text=Book';
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 0.5rem 0' }}>{item.bookId.title}</h3>
                  <p style={{ margin: '0.25rem 0', color: '#666' }}>by {item.bookId.author}</p>
                  <p style={{ margin: '0.25rem 0', fontWeight: 'bold' }}>₹{item.bookId.price}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => updateQuantity(item.bookId._id, item.quantity - 1)}
                      style={{
                        backgroundColor: '#666',
                        color: 'white',
                        border: 'none',
                        width: '30px',
                        height: '30px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      -
                    </button>
                    <span style={{ minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.bookId._id, item.quantity + 1)}
                      style={{
                        backgroundColor: '#666',
                        color: 'white',
                        border: 'none',
                        width: '30px',
                        height: '30px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.bookId._id)}
                    style={{
                      backgroundColor: '#dc3545',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            
            <div style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                Total: ₹{calculateTotal()}
              </div>
              <button
                onClick={() => setShowCheckout(true)}
                style={{
                  backgroundColor: '#8B4513',
                  color: 'white',
                  padding: '0.75rem 2rem',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;