import React from 'react';
import '../pages/BookingPage.css';

// A simple component to represent each professional
// Assuming that your images are named after the professionals for simplicity
const ProfessionalCard = ({ name, availableDate, isSelected, onClick }) => (
  <div
    className={`professional-card ${isSelected ? 'selected' : ''}`}
    onClick={onClick}
  >
    <div className="professional-image-wrapper">
      <img src={require(`../assets/avatar.png`)} alt={name} className="professional-image" />
    </div>
    <div className="professional-info">
      <div className="professional-name">{name}</div>
      <div className="professional-date">Available {availableDate}</div>
    </div>
  </div>
);

export default ProfessionalCard;