import React from 'react';
import { Link } from 'react-router-dom';

const PaymentPage = ({ selectedDay, selectedTime, subtotal }) => {
  return (
    <div className="payment-page">
      <h2>Payment Information</h2>
      <p>Selected Day: {selectedDay}</p>
      <p>Selected Time: {selectedTime}</p>
      <p>Subtotal: ${subtotal}</p> {/* Display subtotal with two decimal places */}
      <Link to="/confirm"> {/* Link to confirmation page */}
        <button className="confirm-button">Confirm Payment</button>
      </Link>
    </div>
  );
};

export default PaymentPage;
