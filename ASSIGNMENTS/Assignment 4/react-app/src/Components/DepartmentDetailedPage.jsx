import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import departmentsData from '../data/departments.json';
import './DepartmentDetailedPage.css';

const DepartmentDetailedPage = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);

  useEffect(() => {
    const foundDepartment = departmentsData.find(dept => dept.id === id);
    setDepartment(foundDepartment);
  }, [id]);

  if (!department) {
    return (
      <div className="department-detail">
        <div className="container">
          <h1>Department not found</h1>
          <Link to="/departments" className="btn btn-primary">Back to Departments</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="department-detail">
      <section className="detail-hero">
        <div className="container">
          <h1>{department.name}</h1>
          <p>{department.description}</p>
          <Link to="/departments" className="back-btn">← Back to Departments</Link>
        </div>
      </section>

      <section className="detail-content">
        <div className="container">
          <div className="detail-grid">
            <div className="detail-card">
              <h2>📚 Courses Offered</h2>
              <ul>
                {department.courses.map((course, index) => (
                  <li key={index}>{course}</li>
                ))}
              </ul>
            </div>

            <div className="detail-card">
              <h2>👨‍🏫 Faculty</h2>
              <ul>
                {department.faculty.map((faculty, index) => (
                  <li key={index}>{faculty}</li>
                ))}
              </ul>
            </div>

            <div className="detail-card">
              <h2>🔬 Labs & Facilities</h2>
              <ul>
                {department.labs.map((lab, index) => (
                  <li key={index}>{lab}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DepartmentDetailedPage;