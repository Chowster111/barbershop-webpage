import React from 'react';
import '../pages/BookingPage.css';

const PaymentSummary = ({ barberName, serviceDescription, price }) => {
  return (
    <div className="payment-summary">
      <h2 className="payment-summary-title">Your order</h2>
      <p className="barbershop-name">Barber Theory barbershop</p>
      <div className="order-details">
        <div className="order-text">
          <p className="barber-name">{barberName}</p>
          <p className="service-description">{serviceDescription}</p>
        </div>
        <p className="price">{price}</p>
      </div>
      <div className="subtotal-section">
        <span className="subtotal-text">Subtotal</span>
        <span className="subtotal-price">{price}</span>
      </div>
      <button className="choose-time-btn">Choose a time</button>
    </div>
  );
};

export default PaymentSummary;