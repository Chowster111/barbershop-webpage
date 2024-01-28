import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SchedulePage.css';
import Map from '../components/Map';

const SchedulePage = ({ selectedBarberName }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isReadyToPay, setIsReadyToPay] = useState(false);

  const daysOfWeek = [
    { day: 31, label: "Wed." },
    { day: 1, label: "Thu." },
    { day: 2, label: "Fri." },
    { day: 3, label: "Sat." },
    { day: 4, label: "Sun." },
    { day: 5, label: "Mon." },
    { day: 6, label: "Tue." },
  ];

  const timeSlots = [
    '10:00am', '10:30am', '11:00am', '11:30am',
    '1:00pm', '1:30pm', '3:00pm', '5:30pm',
  ];

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setSelectedTime(null);
    updatePaymentButtonState(day, selectedTime);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    updatePaymentButtonState(selectedDay, time);
  };

  const updatePaymentButtonState = (day, time) => {
    // Check if both day and time are selected
    if (day !== null && time !== null) {
      setIsReadyToPay(true);
    } else {
      setIsReadyToPay(false);
    }
  };

  return (
    <div className="schedule-page">
      <div className="brand-bubble">AJ Theory</div>
      <div className="left-columnSP">
        <div className="heading-container">
          <h2>Select a Time for {selectedBarberName}</h2>
        </div>
        <div className="day-container">
          {daysOfWeek.map((dayObj, index) => (
            <div
              key={index}
              className={`day-bubble ${selectedDay === dayObj.day ? 'selected' : ''}`}
              onClick={() => handleDayClick(dayObj.day)}
            >
              <div className="day-number">{dayObj.day}</div>
              <div className="day-label">{dayObj.label}</div>
            </div>
          ))}
        </div>
        <div className="time-slot-container">
          {timeSlots.map((time, index) => (
            <div
              key={index}
              className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
              onClick={() => handleTimeClick(time)}
            >
              {time}
            </div>
          ))}
        </div>
      </div>
      <div className="right-columnSP">
        <h2 className="MapHeader">Nearest Location</h2>
        <div className="map-container">
          <Map />
        </div>
         
        <Link to="/payment">
          {/* Conditionally style the button based on isReadyToPay */}
         <button
          className={`payment-button ${isReadyToPay ? 'ready-to-pay' : ''}`}
          disabled={!isReadyToPay}
        >
          Continue
        </button>
        </Link>
      </div>
    </div>
  );
};

export default SchedulePage;
