import React, { useState } from 'react';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    message: ''
  });
  const [submittedData, setSubmittedData] = useState(null);

  const departments = [
    'Computer Science Engineering',
    'Information Technology',
    'Electronics & Communication Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Master of Business Administration'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
    setFormData({
      name: '',
      email: '',
      department: '',
      message: ''
    });
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with us for any inquiries</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-section">
              <h2>Send us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="department">Department *</label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept, index) => (
                      <option key={index} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">Send Message</button>
              </form>
            </div>

            <div className="contact-info">
              <h2>Contact Information</h2>
              <div className="info-item">
                <h3>📍 Address</h3>
                <p>TechCollege Campus<br />Tech City, State - 123456<br />India</p>
              </div>
              <div className="info-item">
                <h3>📞 Phone</h3>
                <p>+91 12345 67890</p>
              </div>
              <div className="info-item">
                <h3>📧 Email</h3>
                <p>info@techcollege.edu</p>
              </div>
              <div className="info-item">
                <h3>🕒 Office Hours</h3>
                <p>Monday - Friday: 9:00 AM - 5:00 PM<br />Saturday: 9:00 AM - 1:00 PM</p>
              </div>
            </div>
          </div>

          {submittedData && (
            <div className="submitted-data">
              <h2>Message Submitted Successfully!</h2>
              <div className="submitted-details">
                <p><strong>Name:</strong> {submittedData.name}</p>
                <p><strong>Email:</strong> {submittedData.email}</p>
                <p><strong>Department:</strong> {submittedData.department}</p>
                <p><strong>Message:</strong> {submittedData.message}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ContactPage;