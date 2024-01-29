import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../pages/BookingPage.css';

const PaymentSummary = ({ barberName, serviceDescription, basePrice, nextAvailableDate }) => {
  const [selectedExtras, setSelectedExtras] = useState([]);
  const history = useHistory();

  // Assume these are the extra services with their respective prices
  const extraServices = [
    { label: 'Hair Wash', price: 7 },
    { label: 'Beard Trim/Shave', price: 10 },
    { label: 'Scissor Cut (1hr)', price: 20 },
  ];

  // Toggle the selection of extra services
  const toggleExtraService = (label) => {
    setSelectedExtras((prevExtras) =>
      prevExtras.includes(label)
        ? prevExtras.filter((extraLabel) => extraLabel !== label)
        : [...prevExtras, label]
    );
  };

  // Calculate the total price based on selected extras
  const calculateTotalPrice = () => {
    const extraCost = selectedExtras.reduce((total, label) => {
      const extra = extraServices.find((extra) => extra.label === label);
      return total + (extra ? extra.price : 0);
    }, 0);
    return (parseFloat(basePrice) + extraCost).toFixed(2);
  };

  // Handle click event for the "Choose a time" button
  const handleChooseTimeClick = () => {
    const subtotal = calculateTotalPrice();
    // Pass the subtotal and the next available date to the SchedulePage
    history.push(`/schedule/${barberName}`, { subtotal, availableDate: nextAvailableDate });
  };

  return (
    <div className="payment-summary">
      <h2 className="payment-summary-title">Your order</h2>
      <p className="barbershop-name">Barber Theory Barbershop</p>
      <div className="order-details">
        <div className="order-text">
          <p className="barber-name">{barberName}</p>
          <div className="service-line">
            <p className="service-description">{serviceDescription}</p>
            {/* Optionally show the base price */}
            {/* <p className="basePrice">${basePrice}</p> */}
          </div>
          {extraServices.map((extra, index) => (
            <div key={index} className="extra-service">
              <button
                className={`extra-service-btn ${selectedExtras.includes(extra.label) ? 'selected' : ''}`}
                onClick={() => toggleExtraService(extra.label)}
              >
                + {extra.label} (${extra.price})
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="subtotal-section">
        <span className="subtotal-text">Subtotal</span>
        <span className="subtotal-price">${calculateTotalPrice()}</span>
      </div>
      <button className="choose-time-btn" onClick={handleChooseTimeClick}>
        Choose a time
      </button>
    </div>
  );
};

export default PaymentSummary;
