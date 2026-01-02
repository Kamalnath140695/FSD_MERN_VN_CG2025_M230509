import React from 'react';
import Snavbar from './Snavbar';

const Shome = () => {
  return (
    <div style={{ backgroundColor: '#F5F5DC', minHeight: '100vh' }}>
      <Snavbar />
      <div style={{ padding: '2rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '3rem', color: '#333' }}>
          Seller Dashboard
        </h1>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginBottom: '3rem',
          maxWidth: '800px',
          margin: '0 auto 3rem auto'
        }}>
          <div style={{
            backgroundColor: '#8B4513',
            color: 'white',
            padding: '2rem',
            borderRadius: '8px',
            textAlign: 'center',
            minWidth: '150px'
          }}>
            <h3 style={{ margin: '0 0 1rem 0' }}>Items</h3>
            <h2 style={{ margin: 0, fontSize: '2rem' }}>2</h2>
          </div>
          
          <div style={{
            backgroundColor: '#FFA500',
            color: 'white',
            padding: '2rem',
            borderRadius: '8px',
            textAlign: 'center',
            minWidth: '150px'
          }}>
            <h3 style={{ margin: '0 0 1rem 0' }}>Total Orders</h3>
            <h2 style={{ margin: 0, fontSize: '2rem' }}>2</h2>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1rem' }}>
            <div style={{
              backgroundColor: '#0000FF',
              width: '60px',
              height: '120px',
              display: 'flex',
              alignItems: 'end'
            }}></div>
            <div style={{
              backgroundColor: '#FFA500',
              width: '60px',
              height: '120px',
              display: 'flex',
              alignItems: 'end'
            }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem' }}>
            <span>Items</span>
            <span>Orders</span>
          </div>
          <p style={{ color: '#8B4513', marginTop: '1rem' }}>■ value</p>
        </div>
      </div>
    </div>
  );
};

export default Shome;