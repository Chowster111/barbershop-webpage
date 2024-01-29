import React, { useEffect, useState } from 'react';
import './ConfirmPage.css';

const ConfirmPage = ({ selectedDay, selectedTime, subtotal }) => {
  const [card, setCard] = useState(null);

  useEffect(() => {
    if (!window.Square) {
      console.error('Square.js failed to load properly');
      return;
    }

    const payments = window.Square.payments('sandbox-sq0idb-qZ__qR7458GAY74pr8IiSw', 'L6CG6RFHN65KF');

    let cardInstance;

    const initializeCard = async () => {
      try {
        cardInstance = await payments.card();
        await cardInstance.attach('#card-container');
        setCard(cardInstance);
      } catch (e) {
        console.error('Initializing Card failed', e);
      }
    };

    initializeCard();

    // Clean up function to destroy the card instance when component unmounts or if it re-renders
    return () => {
      if (cardInstance) {
        cardInstance.destroy();
      }
    };
  }, []);

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();

    if (!card) {
      console.error('No card instance available.');
      return;
    }

    try {
      const tokenResult = await card.tokenize();
      if (tokenResult.status === 'OK') {
        const paymentResult = await createPayment(tokenResult.token);
        console.log('Payment success:', paymentResult);
      } else {
        console.error('Tokenization failed:', tokenResult.errors);
      }
    } catch (e) {
      console.error('Payment failed', e);
    }
  };

  const createPayment = async (token) => {
    const body = JSON.stringify({
      locationId: 'L6CG6RFHN65KF',
      sourceId: token,
      idempotencyKey: crypto.randomUUID(),
      amount: subtotal,
    });

    const response = await fetch('/api/process-payment/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  };

  return (
    <div className="confirm-page-container">
    <div className="brand-bubble">AJ Theory</div>
      <div className="payment-form-container">
        <h2>Confirm Your Appointment</h2>

        <form id="payment-form" onSubmit={handlePaymentSubmit}>
          <div id="card-container"></div>
          <button type="submit" className="payment-button">Confirm and Pay</button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmPage;