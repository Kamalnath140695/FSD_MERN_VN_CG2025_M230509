import React, { useState } from 'react';
import axios from 'axios';
import Snavbar from './Snavbar';

const Addbook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    price: '',
    description: '',
    quantity: '',
    image: null,
    imageUrl: '',
    imageType: 'file' // 'file' or 'url'
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.author || !formData.genre || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (formData.imageType === 'file' && !formData.image) {
      alert('Please select an image file');
      return;
    }
    
    if (formData.imageType === 'url' && !formData.imageUrl) {
      alert('Please enter an image URL');
      return;
    }
    
    try {
      const token = localStorage.getItem('sellerToken');
      if (!token) {
        alert('Please login first');
        window.location.href = '/seller/login';
        return;
      }
      
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('genre', formData.genre);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('quantity', formData.quantity || 1);
      
      if (formData.imageType === 'file' && formData.image) {
        formDataToSend.append('itemImage', formData.image);
      } else if (formData.imageType === 'url' && formData.imageUrl) {
        formDataToSend.append('imageUrl', formData.imageUrl);
      }
      
      const response = await axios.post('http://localhost:8000/api/seller/books', formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      alert('Book added successfully!');
      setFormData({ title: '', author: '', genre: '', price: '', description: '', quantity: '', image: null, imageUrl: '', imageType: 'file' });
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Error adding book:', error);
      alert(error.response?.data?.message || 'Failed to add book');
    }
  };

  return (
    <div style={{ backgroundColor: '#F5F5DC', minHeight: '100vh' }}>
      <Snavbar />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          width: '500px'
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
            Add Book
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title *"
              value={formData.title}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
                marginBottom: '1rem'
              }}
            />
            <input
              type="text"
              name="author"
              placeholder="Author *"
              value={formData.author}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
                marginBottom: '1rem'
              }}
            />
            <input
              type="text"
              name="genre"
              placeholder="Genre *"
              value={formData.genre}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
                marginBottom: '1rem'
              }}
            />
            <input
              type="number"
              name="price"
              placeholder="Price *"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
                marginBottom: '1rem'
              }}
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity (default: 1)"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
                marginBottom: '1rem'
              }}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
                marginBottom: '1rem',
                resize: 'vertical'
              }}
            />
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}>
                Image Option
              </label>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="radio"
                    name="imageType"
                    value="file"
                    checked={formData.imageType === 'file'}
                    onChange={handleChange}
                  />
                  Upload File
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="radio"
                    name="imageType"
                    value="url"
                    checked={formData.imageType === 'url'}
                    onChange={handleChange}
                  />
                  Image URL
                </label>
              </div>
              
              {formData.imageType === 'file' ? (
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem'
                  }}
                />
              ) : (
                <input
                  type="url"
                  name="imageUrl"
                  placeholder="Enter image URL"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '1rem'
                  }}
                />
              )}
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: '#8B4513',
                color: 'white',
                padding: '0.75rem',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1rem',
                cursor: 'pointer',
                width: '100%',
                marginTop: '1rem'
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addbook;