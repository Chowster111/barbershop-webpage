import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import BookingPage from './pages/BookingPage'; // Import the booking page component
import SchedulePage from './pages/SchedulePage'; // Import the schedule page component
import PaymentPage from './pages/PaymentPage'; // Import PaymentPage component
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            timeout={300} // Duration of transition
            classNames="page" // Base class name for transition
          >
            <Switch location={location}>
              <Route exact path="/">
                <div className="container">
                  {/* Your main page content */}
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
              <Route path="/schedule/:barberName" render={(props) => (
                <SchedulePage selectedBarberName={props.match.params.barberName} />
              )} />
              <Route path="/payment" render={(props) => (
                <PaymentPage
                  selectedDay={props.location.state.selectedDay}
                  selectedTime={props.location.state.selectedTime}
                  subtotal={props.location.state.subtotal}
                />
              )} />
              {/* Add other Routes here if necessary */}
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )} />
    </Router>
  );
}

export default App;
