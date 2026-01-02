import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Seller = () => {
  const [sellers, setSellers] = useState([]);
  const [userName] = useState('Abhi');
  const [editModal, setEditModal] = useState({ show: false, seller: null });
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [booksModal, setBooksModal] = useState({ show: false, books: [], sellerName: '' });

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/admin/sellers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSellers(response.data);
    } catch (error) {
      // Mock data if API fails
      setSellers([
        { _id: '68959952d9691a6325af12a4', name: 'Pravanshu', email: 'pravanshu@gmail.com', isApproved: false },
        { _id: '68959db78e1cfa3b586c7438', name: 'Seller2', email: 'seller2@gmail.com', isApproved: true }
      ]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/admin/login';
  };

  const handleEdit = (seller) => {
    setEditForm({ name: seller.name, email: seller.email });
    setEditModal({ show: true, seller });
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8000/api/admin/seller/${editModal.seller._id}`, editForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditModal({ show: false, seller: null });
      fetchSellers();
      alert('Seller updated successfully!');
    } catch (error) {
      alert('Failed to update seller');
    }
  };

  const handleDelete = async (sellerId) => {
    if (window.confirm('Are you sure you want to delete this seller?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:8000/api/admin/seller/${sellerId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchSellers();
        alert('Seller deleted successfully!');
      } catch (error) {
        alert('Failed to delete seller');
      }
    }
  };

  const handleViewBooks = async (seller) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/api/admin/seller/${seller._id}/books`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooksModal({ show: true, books: response.data, sellerName: seller.name });
    } catch (error) {
      alert('Failed to fetch seller books');
    }
  };

  const handleApprove = async (sellerId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8000/api/admin/approve-seller/${sellerId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSellers(); // Refresh the list
      alert('Seller approved successfully!');
    } catch (error) {
      alert('Failed to approve seller');
    }
  };

  return (
    <div style={{
      backgroundColor: '#F5F5DC',
      minHeight: '100vh'
    }}>
      <nav style={{
        backgroundColor: '#8B4513',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>BookStore (Admin)</div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="/admin/home" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="/admin/users" style={{ color: 'white', textDecoration: 'none' }}>Users</a>
          <a href="/admin/sellers" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Sellers</a>
          <a href="/admin/profile" style={{ color: 'white', textDecoration: 'none' }}>Profile</a>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>Logout</button>
          <span>({userName})</span>
        </div>
      </nav>
      
      <div style={{ padding: '2rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>Sellers</h1>
        
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <table style={{
            width: '100%',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            borderCollapse: 'collapse',
            overflow: 'hidden'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Sl/No</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Seller ID</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Name</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Email</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Operation</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller, index) => (
                <tr key={seller._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem' }}>{index + 1}</td>
                  <td style={{ padding: '1rem', fontSize: '0.9rem', color: '#666' }}>{seller._id}</td>
                  <td style={{ padding: '1rem' }}>{seller.name}</td>
                  <td style={{ padding: '1rem' }}>{seller.email}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      backgroundColor: seller.isApproved ? '#d4edda' : '#f8d7da',
                      color: seller.isApproved ? '#155724' : '#721c24'
                    }}>
                      {seller.isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <button 
                        onClick={() => handleEdit(seller)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '1.2rem'
                        }}
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDelete(seller._id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '1.2rem'
                        }}
                      >
                        🗑️
                      </button>
                      {!seller.isApproved && (
                        <button 
                          onClick={() => handleApprove(seller._id)}
                          style={{
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            marginRight: '0.5rem'
                          }}
                        >
                          Approve
                        </button>
                      )}
                      <button 
                        onClick={() => handleViewBooks(seller)}
                        style={{
                          backgroundColor: '#8B4513',
                          color: 'white',
                          border: 'none',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        View Books
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {editModal.show && (
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
            width: '400px',
            maxWidth: '90vw'
          }}>
            <h3 style={{ marginBottom: '1rem' }}>Edit Seller</h3>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name:</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email:</label>
              <input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setEditModal({ show: false, seller: null })}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                style={{
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '4px',
                  backgroundColor: '#8B4513',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      
      {booksModal.show && (
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
            <h3 style={{ marginBottom: '1rem' }}>Books by {booksModal.sellerName}</h3>
            
            {booksModal.books.length === 0 ? (
              <p>No books found for this seller.</p>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {booksModal.books.map(book => (
                  <div key={book._id} style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '1rem',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9'
                  }}>
                    <img
                      src={book.itemImage || 'https://via.placeholder.com/80x120/8B4513/FFFFFF?text=Book'}
                      alt={book.title}
                      style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80x120/8B4513/FFFFFF?text=Book';
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 0.5rem 0' }}>{book.title}</h4>
                      <p style={{ margin: '0.25rem 0', color: '#666' }}>by {book.author}</p>
                      <p style={{ margin: '0.25rem 0', color: '#666' }}>Genre: {book.genre}</p>
                      <p style={{ margin: '0.25rem 0', fontWeight: 'bold' }}>₹{book.price}</p>
                      <p style={{ margin: '0.25rem 0', color: '#666' }}>Stock: {book.inventory?.quantity || 0}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button
                onClick={() => setBooksModal({ show: false, books: [], sellerName: '' })}
                style={{
                  padding: '0.5rem 2rem',
                  border: 'none',
                  borderRadius: '4px',
                  backgroundColor: '#dc3545',
                  color: 'white',
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
};

export default Seller;