import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SchedulePage.css';
import Map from '../components/Map';

const SchedulePage = ({ selectedBarberName, startDate }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isReadyToPay, setIsReadyToPay] = useState(false);
  const [daysOfWeek, setDaysOfWeek] = useState([]);

  const location = useLocation();

  useEffect(() => {
    // Helper function to get the days of the week starting from a specific date
    const getDaysOfWeek = (startDate) => {
      const days = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const day = date.getDate();
        const label = date.toLocaleDateString('en-US', { weekday: 'short' }) + '.';
        days.push({ day, label });
      }
      return days;
    };

// Check if availableDate is passed and is valid
if (location.state?.availableDate) {
  const startDate = new Date(location.state.availableDate);
  setDaysOfWeek(getDaysOfWeek(startDate));
} else {
  // Handle the case where no date is passed or the date is invalid
  console.error("No available date provided");
}
}, [location.state]);

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
    setIsReadyToPay(day !== null && time !== null);
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
        <Link
          to={{
            pathname: "/payment",
            state: {
              selectedDay: selectedDay,
              selectedTime: selectedTime,
              subtotal: location.state ? location.state.subtotal : 0,
            },
          }}
        >
          <button
            className={`payment-button1 ${isReadyToPay ? 'ready-to-pay' : ''}`}
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
