import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BookingPage from './pages/BookingPage'; // Import the booking page component
import './App.css';
import { Link } from 'react-router-dom';


function App() {
  return (
    <Router>
    <Switch>
    <Route exact path="/">
    <div className="container">
      <div className="left-column">
      <div className="header">AJ Theory</div>
        <div className="overlay">
          <h1 className='LandingName'>Barber Theory</h1>
          <p className='LocationLanding'>📍 1 Location In Toronto, ON</p>
          <button className='BookNowMainPageButton'>
          <Link to="/book" style={{ textDecoration: 'none', color: 'inherit' }}>
            Book now
          </Link>
          </button>
        </div>
      </div>
      <div className="right-column">
        <div className="info">
          <p className='NAMEinfo'>BARBER THEORY</p>
          <div className="Otherinfo">
          <p>377 Broadview Ave Unit 103</p>
          <p>Toronto, ON M4k2M7</p>
          </div>
        </div>
      </div>
    </div>
    </Route>
    <Route path="/book">
          <BookingPage />
    </Route>
    </Switch>
    </Router>
  );
}

export default App;
