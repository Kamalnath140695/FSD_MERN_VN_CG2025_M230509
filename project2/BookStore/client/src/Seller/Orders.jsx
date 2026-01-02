import React, { useState, useEffect } from 'react';
import Snavbar from './Snavbar';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('sellerToken');
      if (!token) {
        setError('Please login first');
        setLoading(false);
        return;
      }

      console.log('Fetching orders with token:', token);

      const response = await fetch('http://localhost:8000/api/seller/orders', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to fetch orders: ${response.status}`);
      }

      const data = await response.json();
      console.log('Orders data received:', data);
      setOrders(data);
    } catch (err) {
      console.error('Fetch orders error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  return (
    <div style={{ backgroundColor: '#F5F5DC', minHeight: '100vh' }}>
      <Snavbar />
      <div style={{ padding: '2rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
          Orders
        </h1>
        
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {loading ? (
            <p style={{ textAlign: 'center' }}>Loading orders...</p>
          ) : error ? (
            <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
          ) : orders.length === 0 ? (
            <p style={{ textAlign: 'center' }}>No orders found.</p>
          ) : (
            orders.map(order => (
              <div key={order._id} style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>Order #{order._id.slice(-8)}</h3>
                    <p style={{ margin: '0.25rem 0', color: '#666' }}>Buyer: {order.userId?.name || 'Unknown'}</p>
                    <p style={{ margin: '0.25rem 0', color: '#666' }}>Items: {order.items.length}</p>
                    <p style={{ margin: '0.25rem 0', color: '#666' }}>Total: ₹{order.totalAmount}</p>
                    <p style={{ margin: '0.25rem 0', color: order.status === 'shipped' ? '#007bff' : '#666' }}>
                      Status: {order.status}
                    </p>
                    <p style={{ margin: '0.25rem 0', color: '#666' }}>Date: {new Date(order.bookingDate).toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => handleViewOrder(order)}
                    style={{
                      backgroundColor: '#8B4513',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {showModal && selectedOrder && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '8px',
              maxWidth: '700px',
              width: '90%',
              position: 'relative',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}>
              <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
                Order Details
              </h2>
              
              <div style={{ marginBottom: '2rem' }}>
                <p><strong>Order ID:</strong> {selectedOrder._id}</p>
                <p><strong>Buyer:</strong> {selectedOrder.userId?.name} ({selectedOrder.userId?.email})</p>
                <p><strong>Status:</strong> {selectedOrder.status}</p>
                <p><strong>Order Date:</strong> {new Date(selectedOrder.bookingDate).toLocaleDateString()}</p>
                <p><strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}</p>
                
                {selectedOrder.shippingAddress && (
                  <div style={{ marginTop: '1rem' }}>
                    <p><strong>Shipping Address:</strong></p>
                    <p>{selectedOrder.shippingAddress.flatno}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}</p>
                  </div>
                )}
              </div>
              
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#333', marginBottom: '1rem' }}>Items:</h3>
                {selectedOrder.items.map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '1rem',
                    backgroundColor: '#F5F5DC',
                    borderRadius: '8px',
                    marginBottom: '1rem'
                  }}>
                    {item.bookId?.itemImage && (
                      <img 
                        src={item.bookId.itemImage} 
                        alt={item.title}
                        style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                    )}
                    <div style={{ flex: 1 }}>
                      <p><strong>{item.title}</strong></p>
                      <p>by {item.author}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ₹{item.price} each</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={closeModal}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    padding: '0.75rem 2rem',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
              </div>
              
              <button
                onClick={closeModal}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.25rem 0.5rem',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;