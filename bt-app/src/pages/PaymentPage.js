import React from 'react';

const PaymentPage = () => {
  // You can fetch the selected day, time slot, and subtotal from your state or props here

  return (
    <div className="payment-page">
      <h2>Payment Information</h2>
      {/* Display the selected day, time slot, and subtotal here */}
      <p>Selected Day: { /* Place selected day here */ }</p>
      <p>Selected Time Slot: { /* Place selected time slot here */ }</p>
      <p>Subtotal: ${ /* Place subtotal here */ }</p>

      {/* Add payment form or integration with a payment gateway here */}
      
      {/* Add a button to confirm the payment and proceed */}
      <button>Confirm Payment</button>
    </div>
  );
};

export default PaymentPage;
