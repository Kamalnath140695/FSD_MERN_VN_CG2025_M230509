import React, { useState, useEffect } from 'react';
import DepartmentCard from './DepartmentCard';
import departmentsData from '../data/departments.json';
import './DepartmentPage.css';

const DepartmentPage = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    setDepartments(departmentsData);
  }, []);

  return (
    <div className="department-page">
      <section className="dept-hero">
        <div className="container">
          <h1>Our Departments</h1>
          <p>Explore our diverse range of academic programs</p>
        </div>
      </section>

      <section className="departments-section">
        <div className="container">
          <div className="departments-grid">
            {departments.map(department => (
              <DepartmentCard key={department.id} department={department} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DepartmentPage;