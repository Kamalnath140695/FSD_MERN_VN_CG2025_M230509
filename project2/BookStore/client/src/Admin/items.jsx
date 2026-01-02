import React from 'react';

const Items = () => {
  return (
    <div style={{
      backgroundColor: '#F5F5DC',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>
        Admin - Items Management
      </h1>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <p style={{ color: '#666', textAlign: 'center' }}>
          Items management functionality will be implemented here.
        </p>
      </div>
    </div>
  );
};

export default Items;