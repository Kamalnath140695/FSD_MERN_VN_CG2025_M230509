import React, { useState, useEffect } from 'react';

const AdminProfile = () => {
  const [adminData, setAdminData] = useState({ name: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '' });

  useEffect(() => {
    // Get admin data from localStorage (set during login)
    const userData = localStorage.getItem('adminData');
    if (userData) {
      const admin = JSON.parse(userData);
      setAdminData(admin);
      setEditForm(admin);
    } else {
      // Fallback data
      setAdminData({ name: 'Abhi', email: 'admin@bookstore.com' });
      setEditForm({ name: 'Abhi', email: 'admin@bookstore.com' });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminData');
    window.location.href = '/admin/login';
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setAdminData(editForm);
    localStorage.setItem('adminData', JSON.stringify(editForm));
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditForm(adminData);
    setIsEditing(false);
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
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>BookStore (Admin)</div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="/admin/home" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="/admin/users" style={{ color: 'white', textDecoration: 'none' }}>Users</a>
          <a href="/admin/sellers" style={{ color: 'white', textDecoration: 'none' }}>Sellers</a>
          <a href="/admin/profile" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Profile</a>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>Logout</button>
          <span>({adminData.name})</span>
        </div>
      </nav>

      <div style={{ padding: '2rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
          Admin Profile
        </h1>

        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: '#8B4513',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto',
              fontSize: '2rem',
              color: 'white'
            }}>
              {adminData.name.charAt(0).toUpperCase()}
            </div>
            <h2 style={{ margin: 0, color: '#333' }}>{adminData.name}</h2>
            <p style={{ color: '#666', margin: '0.5rem 0' }}>Administrator</p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                Name:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem'
                  }}
                />
              ) : (
                <p style={{ 
                  padding: '0.75rem',
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #e9ecef',
                  borderRadius: '4px',
                  margin: 0
                }}>
                  {adminData.name}
                </p>
              )}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                Email:
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem'
                  }}
                />
              ) : (
                <p style={{ 
                  padding: '0.75rem',
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #e9ecef',
                  borderRadius: '4px',
                  margin: 0
                }}>
                  {adminData.email}
                </p>
              )}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                Role:
              </label>
              <p style={{ 
                padding: '0.75rem',
                backgroundColor: '#f8f9fa',
                border: '1px solid #e9ecef',
                borderRadius: '4px',
                margin: 0
              }}>
                Administrator
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            {isEditing ? (
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button
                  onClick={handleSave}
                  style={{
                    backgroundColor: '#28a745',
                    color: 'white',
                    padding: '0.75rem 2rem',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  style={{
                    backgroundColor: '#6c757d',
                    color: 'white',
                    padding: '0.75rem 2rem',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={handleEdit}
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
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div style={{
          maxWidth: '600px',
          margin: '2rem auto 0 auto',
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#333' }}>System Information</h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 'bold' }}>System Version:</span>
              <span>BookStore v1.0</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 'bold' }}>Last Login:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 'bold' }}>Access Level:</span>
              <span>Full Administrator</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;