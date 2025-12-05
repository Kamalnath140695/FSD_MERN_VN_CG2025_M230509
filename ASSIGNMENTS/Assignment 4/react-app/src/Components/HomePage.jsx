import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DepartmentCard from './DepartmentCard';
import departmentsData from '../data/departments.json';
import './HomePage.css';

const HomePage = () => {
  const [topDepartments, setTopDepartments] = useState([]);

  useEffect(() => {
    // Get first 3 departments as top departments
    setTopDepartments(departmentsData.slice(0, 3));
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to TechCollege</h1>
          <p className="hero-tagline">Shaping Tomorrow's Leaders Through Excellence in Education</p>
          <div className="hero-buttons">
            <Link to="/about" className="btn btn-primary">Learn More</Link>
            <Link to="/departments" className="btn btn-secondary">Explore Departments</Link>
          </div>
        </div>
      </section>

      {/* Why This College Section */}
      <section className="why-college">
        <div className="container">
          <h2>Why Choose TechCollege?</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>🎓 Academic Excellence</h3>
              <p>Top-ranked programs with industry-relevant curriculum and experienced faculty.</p>
            </div>
            <div className="feature">
              <h3>🔬 Modern Facilities</h3>
              <p>State-of-the-art labs, libraries, and research facilities for hands-on learning.</p>
            </div>
            <div className="feature">
              <h3>💼 Industry Connections</h3>
              <p>Strong partnerships with leading companies for internships and placements.</p>
            </div>
            <div className="feature">
              <h3>🌟 Student Success</h3>
              <p>95% placement rate with graduates working in top companies worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Departments Section */}
      <section className="top-departments">
        <div className="container">
          <h2>Our Top Departments</h2>
          <div className="departments-grid">
            {topDepartments.map(department => (
              <DepartmentCard key={department.id} department={department} />
            ))}
          </div>
          <div className="view-all-btn">
            <Link to="/departments" className="btn btn-primary">View All Departments</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
