import React from 'react';
import { Link } from 'react-router-dom';
import './DepartmentCard.css';

const DepartmentCard = ({ department }) => {
  return (
    <div className="department-card">
      <h3>{department.name}</h3>
      <p>{department.description}</p>
      <Link to={`/departments/${department.id}`} className="view-more-btn">
        View More
      </Link>
    </div>
  );
};

export default DepartmentCard;