import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#F5F5DC',
      padding: '2rem',
      textAlign: 'center',
      borderTop: '1px solid #ddd',
      marginTop: 'auto'
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
      
      <p style={{ 
        color: '#666', 
        fontStyle: 'italic', 
        margin: '1rem 0',
        fontSize: '1rem'
      }}>
        "Embark on a literary journey with our book haven – where every page turns into an adventure!"
      </p>
      
      <p style={{ 
        color: '#666', 
        margin: '0.5rem 0',
        fontSize: '1rem'
      }}>
        📞 Call At: 127-865-586-67
      </p>
      
      <p style={{ 
        color: '#666', 
        fontSize: '0.9rem',
        margin: '0.5rem 0'
      }}>
        © 2025 <strong>BookVerse</strong>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;