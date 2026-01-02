import React, { useState, useEffect } from 'react';
import Snavbar from './Snavbar';
import './List.css';

const MyProducts = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMyBooks();
  }, []);

  const fetchMyBooks = async () => {
    try {
      const token = localStorage.getItem('sellerToken');
      if (!token) {
        setError('Please login first');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:8000/api/seller/books', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }

      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (bookId) => {
    if (!confirm('Are you sure you want to delete this book?')) return;
    
    try {
      const token = localStorage.getItem('sellerToken');
      const response = await fetch(`http://localhost:8000/api/seller/books/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setBooks(books.filter(book => book._id !== bookId));
        alert('Book deleted successfully');
      }
    } catch (error) {
      alert('Failed to delete book');
    }
  };

  return (
    <div style={{ backgroundColor: '#F5F5DC', minHeight: '100vh' }}>
      <Snavbar />
      <div style={{ padding: '2rem' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
          Books List
        </h1>
        
        <div className="books-grid">
          {loading ? (
            <p>Loading your books...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : books.length === 0 ? (
            <p>No books found. <a href="/seller/addbook">Add your first book</a></p>
          ) : (
            books.map(book => (
              <div key={book._id} className="book-card">
                <div className="book-image">
                  <img src={book.itemImage || '/api/placeholder/200/300'} alt={book.title} />
                  <button className="delete-btn" onClick={() => deleteBook(book._id)}>🗑️</button>
                </div>
                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p><strong>Author:</strong> {book.author}</p>
                  <p><strong>Genre:</strong> {book.genre}</p>
                  <p className="price"><strong>Price:</strong> ₹{book.price}</p>
                  <p><strong>Description:</strong> {book.description}</p>
                  <p><strong>Quantity:</strong> {book.inventory?.quantity || 0}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProducts;