import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>TechCollege</h3>
            <p>Excellence in Education Since 1985</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>Admissions</li>
              <li>Academic Calendar</li>
              <li>Student Portal</li>
              <li>Faculty</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>📧 info@techcollege.edu</p>
            <p>📞 +91 12345 67890</p>
            <p>📍 Tech City, India</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 TechCollege. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;