import React, { useState, useEffect } from 'react';
import './BookingPage.css'; // Ensure you have a CSS file with this name
import ProfessionalCard from '../components/ProfessionalCard';
import PaymentSummary from '../components/PaymentSummary';
// import ServiceSelection from '../components/ServiceSelection';


// The main booking page component
const BookingPage = () => {


  const [professionals, setProfessionals] = useState([
    { name: 'Ricky', availableDate: '' },
    { name: 'Jeremy', availableDate: '' },
    { name: 'Kevin', availableDate: ''},
    { name: 'Marc', availableDate: ''},
    { name: 'Lamar', availableDate: ''},
    { name: 'Jacob', availableDate: ''},
  ]);

  useEffect(() => {
    // Function to add days to a date
    const addDays = (date, daysToAdd) => {
      const result = new Date(date);
      result.setDate(result.getDate() + daysToAdd);
      return result;
    };

    // Function to format a date as a string
    const formatDate = (date) => {
      return date.toLocaleDateString(undefined, {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
    };

    // Create a new array with updated availability dates
    const updatedProfessionals = professionals.map(professional => {
      const randomDaysToAdd = Math.floor(Math.random() * 4) + 1; // Random number between 1 and 4
      const newDate = addDays(new Date(), randomDaysToAdd);
      return { ...professional, availableDate: formatDate(newDate) };
    });

    setProfessionals(updatedProfessionals);
  }, []); // Empty dependency array to run only once on component mount

  
  const selectedService = {
    barberName: 'Marc',
    serviceDescription: 'Haircut & Beard trim - L2',
    price: '$44.25'
  };


  return (
    <div className="booking-container">
      <div className="left-container">
        <h1 className="header-title">Choose A Professional</h1>
        <div className="professionals-container">
          {professionals.map((professional, index) => (
            <ProfessionalCard key={index} {...professional} />
          ))}
        </div>
      </div>
      <div className="right-container">
      <PaymentSummary
        barberName={selectedService.barberName}
        serviceDescription={selectedService.serviceDescription}
        price={selectedService.price}
      />
      </div>
    </div>
  );
};

export default BookingPage;
