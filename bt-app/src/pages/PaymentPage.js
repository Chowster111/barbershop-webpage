import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PaymentPage.css'; // Import your PaymentPage-specific CSS file

function formatDay(day) {
  if (day >= 11 && day <= 13) {
    return `${day}th`;
  }
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

const PaymentPage = ({ selectedDay, selectedTime, subtotal }) => {
  let formattedDate;
  if (selectedDay >= 29 && selectedDay <= 31) {
    formattedDate = `January ${formatDay(selectedDay)}, 2024`;
  } else {
    formattedDate = `February ${formatDay(selectedDay)}, 2024`;
  }

  const tipOptions = [18, 25, 35, 50];
  const [selectedTip, setSelectedTip] = useState(null);
  const [customTip, setCustomTip] = useState('');
  const [expandedTip, setExpandedTip] = useState(null);

  const handleTipClick = (tip) => {
    setSelectedTip(tip);
  };

  const handleCustomTipChange = (event) => {
    const inputTip = event.target.value;
    // Ensure the custom tip is a valid number
    if (/^\d+$/.test(inputTip)) {
      setCustomTip(inputTip);
    } else {
      setCustomTip('');
    }
  };

  const calculateTotalPrice = () => {
    let tipAmount = selectedTip;
    if (customTip !== '') {
      tipAmount = parseInt(customTip);
    }
    const total = 1.13 * (subtotal * (1 + tipAmount / 100));
    return total.toFixed(2);
  };

  const handleTipSelect = (tipAmount) => {
    // If the selected tip is the same as the currently selected tip, deselect it
    if (selectedTip === tipAmount) {
      setSelectedTip(null);
    } else {
      // Otherwise, select the clicked tip
      setSelectedTip(tipAmount);
    }
  };

  return (
    <div className="payment-container"> {/* Updated class name */}
    <div className="brand-bubble">AJ Theory</div> {/* AJ Theory logo or title */}
      <div className="payment-box"> {/* Container with darker background and thin borders */}
        <h2 className="payment-summary-title">Payment Information</h2>
        <p className="barbershop-name">Barber Theory Barbershop</p>
        <div className="order-details">
          <div className="order-text">
            <p className="barber-time">{selectedTime} ET</p>
            <div className="service-line">
              <p className="service-description">{formattedDate}</p> {/* Use the formatted date */}
            </div>
          </div>
        </div>

        <div className="tip-options">
            {tipOptions.map((tipAmount) => (
            <button
            key={tipAmount}
            className={`tip-option ${selectedTip === tipAmount ? 'selected' : ''}`}
            onClick={() => handleTipSelect(tipAmount)}
            >
            {tipAmount}%
            </button>
            ))}
          <input
            type="text"
            placeholder="Custom Tip (%)"
            value={customTip}
            onChange={handleCustomTipChange}
            className="custom-tip-input" // Add the custom-tip-input class
          />
        </div>

        <hr className="horizontal-line" /> {/* Horizontal line */}

        <div className="subtotal-section">
          <span className="subtotal-text">Subtotal</span>
          <span className="subtotal-price">${subtotal}</span>
        </div>

        <div className="total-section">
          <span className="total-text">Total</span>
          <span className="total-price">${calculateTotalPrice()}</span>
        </div>

        <Link to="/confirm"> {/* Link to the confirmation page */}
          <button className="confirm-button">Proceed to Payment</button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentPage;
