import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SchedulePage.css';
import Map from '../components/Map';

const SchedulePage = ({ selectedBarberName, startDate }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isReadyToPay, setIsReadyToPay] = useState(false);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [dayTimeSlots, setDayTimeSlots] = useState([]);

  const location = useLocation();

  useEffect(() => {
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

    if (location.state?.availableDate) {
      const startDate = new Date(location.state.availableDate);
      setDaysOfWeek(getDaysOfWeek(startDate));
    } else {
      console.error("No available date provided");
    }
  }, [location.state]);

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 19; hour++) {
      const hourString = hour > 12 ? hour - 12 : hour;
      const amPm = hour >= 12 ? 'pm' : 'am';

      slots.push(`${hourString}:00${amPm}`);
      if (hour < 19) {
        slots.push(`${hourString}:30${amPm}`);
      }
    }
    return slots;
  };

  const allTimeSlots = generateTimeSlots();

  const compareTimeSlots = (time1, time2) => {
    const formatTime = time => {
      const [hourMinute, period] = time.split(/(am|pm)/);
      let [hours, minutes] = hourMinute.split(':');
      hours = period === 'pm' ? (parseInt(hours) % 12) + 12 : parseInt(hours);
      return parseInt(hours) * 60 + parseInt(minutes);
    };

    return formatTime(time1) - formatTime(time2);
  };

  const getRandomSubset = (slots, minSize) => {
    let maxSize = 11;
    let subset = [];
    while (subset.length < minSize) {
      subset = slots
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize);
      // Sort the subset in chronological order
      subset.sort(compareTimeSlots);
    }
    return subset;
  };
  const handleDayClick = (day) => {
    setSelectedDay(day);
    setSelectedTime(null);
    updatePaymentButtonState(day, selectedTime);

    const randomSubset = getRandomSubset(allTimeSlots, 2);
    setDayTimeSlots(randomSubset);
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
          {dayTimeSlots.map((time, index) => (
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
