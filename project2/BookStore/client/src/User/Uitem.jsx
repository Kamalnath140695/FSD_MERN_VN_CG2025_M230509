import React from 'react';

const Uitem = ({ book }) => {
  const defaultBook = {
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-help / Psychology',
    price: '450',
    seller: 'Pravanshu',
    description: 'A practical guide to building good habits and breaking bad ones, backed by scientific research.',
    image: '/api/placeholder/300/400'
  };

  const bookData = book || defaultBook;

  return (
    <div style={{
      backgroundColor: '#F5F5DC',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        maxWidth: '800px',
        width: '100%'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2rem'
        }}>
          <img
            src={bookData.image}
            alt={bookData.title}
            style={{
              width: '250px',
              height: '350px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '2rem'
            }}
          />
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            width: '100%',
            maxWidth: '600px'
          }}>
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '1.5rem',
              borderRadius: '8px'
            }}>
              <h3 style={{ marginBottom: '1rem', color: '#333' }}>Description</h3>
              <p style={{ color: '#666', lineHeight: '1.5' }}>
                {bookData.description}
              </p>
            </div>
            
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '1.5rem',
              borderRadius: '8px'
            }}>
              <h3 style={{ marginBottom: '1rem', color: '#333' }}>Info</h3>
              <div style={{ color: '#666' }}>
                <p><strong>Title:</strong> {bookData.title}</p>
                <p><strong>Author:</strong> {bookData.author}</p>
                <p><strong>Genre:</strong> {bookData.genre}</p>
                <p><strong>Price:</strong> ₹{bookData.price}</p>
                <p><strong>Seller:</strong> {bookData.seller}</p>
              </div>
            </div>
          </div>
          
          <button
            style={{
              backgroundColor: '#8B4513',
              color: 'white',
              padding: '0.75rem 2rem',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer',
              marginTop: '2rem'
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Uitem;