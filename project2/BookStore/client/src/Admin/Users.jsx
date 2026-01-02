import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [userName] = useState('Abhi');
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login first');
        setLoading(false);
        return;
      }
      
      const response = await axios.get('http://localhost:8000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/admin/login';
  };

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setEditForm({ name: user.name, email: user.email });
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8000/api/admin/user/${editingUser}`, editForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.map(user => 
        user._id === editingUser ? { ...user, ...editForm } : user
      ));
      setEditingUser(null);
      setEditForm({ name: '', email: '' });
    } catch (error) {
      alert('Failed to update user');
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditForm({ name: '', email: '' });
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8000/api/admin/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(users.filter(user => user._id !== userId));
      } catch (error) {
        alert('Failed to delete user');
      }
    }
  };

  const handleViewOrders = async (user) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/api/admin/user/${user._id}/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserOrders(response.data);
      setSelectedUser(user);
      setShowOrdersModal(true);
    } catch (error) {
      alert('Failed to fetch user orders');
    }
  };

  return (
    <div className="admin-layout">
      <nav className="admin-navbar">
        <div className="nav-brand">BookStore (Admin)</div>
        <div className="nav-links">
          <a href="/admin/home">Home</a>
          <a href="/admin/users" className="active">Users</a>
          <a href="/admin/sellers">Sellers</a>
          <a href="/admin/profile">Profile</a>
          <button onClick={handleLogout}>Logout</button>
          <span className="user-name">({userName})</span>
        </div>
      </nav>
      
      <div className="dashboard-content">
        <h1>Users</h1>
        
        <div className="users-table-container">
          {loading ? (
            <p style={{ textAlign: 'center', padding: '2rem' }}>Loading users...</p>
          ) : error ? (
            <p style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>{error}</p>
          ) : users.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '2rem' }}>No users found.</p>
          ) : (
            <table className="users-table">
              <thead>
                <tr>
                  <th>Sl/No</th>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user._id}</td>
                    <td>
                      {editingUser === user._id ? (
                        <input 
                          type="text" 
                          value={editForm.name} 
                          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                          style={{ width: '100%', padding: '4px' }}
                        />
                      ) : (
                        user.name
                      )}
                    </td>
                    <td>
                      {editingUser === user._id ? (
                        <input 
                          type="email" 
                          value={editForm.email} 
                          onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                          style={{ width: '100%', padding: '4px' }}
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td className="operations">
                      {editingUser === user._id ? (
                        <>
                          <button className="save-btn" onClick={handleSaveEdit}>✓</button>
                          <button className="cancel-btn" onClick={handleCancelEdit}>✗</button>
                        </>
                      ) : (
                        <>
                          <button className="edit-btn" onClick={() => handleEdit(user)}>✏️</button>
                          <button className="delete-btn" onClick={() => handleDelete(user._id)}>🗑️</button>
                          <button className="view-orders-btn" onClick={() => handleViewOrders(user)}>View Orders</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      
      {showOrdersModal && (
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
            maxWidth: '800px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <h2>Orders for {selectedUser?.name}</h2>
            
            {userOrders.length === 0 ? (
              <p>No orders found for this user.</p>
            ) : (
              <div>
                {userOrders.map(order => (
                  <div key={order._id} style={{
                    border: '1px solid #ddd',
                    padding: '1rem',
                    marginBottom: '1rem',
                    borderRadius: '4px'
                  }}>
                    <h4>Order #{order._id.slice(-8)}</h4>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                    <p><strong>Date:</strong> {new Date(order.bookingDate).toLocaleDateString()}</p>
                    
                    <div style={{ marginTop: '1rem' }}>
                      <strong>Items:</strong>
                      {order.items.map((item, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          gap: '1rem',
                          padding: '0.5rem',
                          backgroundColor: '#f9f9f9',
                          marginTop: '0.5rem',
                          borderRadius: '4px'
                        }}>
                          {item.bookId?.itemImage && (
                            <img 
                              src={item.bookId.itemImage} 
                              alt={item.title}
                              style={{ width: '40px', height: '50px', objectFit: 'cover' }}
                            />
                          )}
                          <div>
                            <p><strong>{item.title}</strong> by {item.author}</p>
                            <p>Qty: {item.quantity} | Price: ₹{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button 
                onClick={() => setShowOrdersModal(false)}
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  padding: '0.5rem 2rem',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;