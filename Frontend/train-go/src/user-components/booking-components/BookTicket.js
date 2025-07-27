import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../UserStyling/BookTicket.css';
import { AuthContext } from '../../contexts/AuthContext';

export default function BookTicket() {
  let { isLogin, setLogin, user, setUser } = useContext(AuthContext)
  //console.log("User data to be validated : "+user.name);
  //console.log("User id : "+ user.id);

  const { state } = useLocation();
  const navigateTo = useNavigate();

  const [passengers, setPassengers] = useState([{ name: '', age: '', gender: '' }]);

  if (!state) {
    return <div className="container text-center p-5">No Booking Information Found.</div>;
  }


  const { train, schedule, selectedCoach, seatInfo } = state;

  const handlePassengerChange = (index, e) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][e.target.name] = e.target.value;
    setPassengers(updatedPassengers);
  };

  const addPassenger = () => {
    setPassengers([...passengers, { name: '', age: '', gender: '' }]);
  };

  const removePassenger = (index) => {
    const updatedPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(updatedPassengers);
  };

  const handleBooking = async () => {
    const scheduleId = schedule.id;
    const coachTypeId = selectedCoach.id;


    let response = await fetch(`http://localhost:8080/bookings/${user.id}/${scheduleId}/${coachTypeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passengers),
    });

    const result = await response.json();
    alert(result.message || 'Booking successful!');
    navigateTo('/user/mybookings');

  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="ticket-container">
      <div className="ticket-header">
        <div>
          <h2>{train.trainName} ({train.trainNumber})</h2>
          <p> {train.source.stationName} ({train.source.stationCode}) ➝ {train.destination.stationName} ({train.destination.stationCode})</p>
          <p>  <strong> Class: </strong> {selectedCoach.typeName} </p>
          <div className='mt-4'>
            <p> <strong>Boarding Station : </strong> {train.source.stationName} | <strong>Arrival:</strong> {schedule.arrivalTime} | <strong>Departure:</strong> {schedule.departureTime} |
              <strong>Boarding Date: </strong> {formatDate(schedule.travelDate)}</p>
          </div>
        </div>
        <div className="fare-summary">
          <h5>Fare: <h4>₹{seatInfo.fare.toFixed(2)}</h4></h5>
        </div>
      </div>

      <div className="passenger-section">
        <h4>Passenger Details</h4>
        {passengers.map((passenger, index) => (
          <div className="passenger-form" key={index}>
            <input type="text" name="name" placeholder="Full Name" value={passenger.name} onChange={(e) => handlePassengerChange(index, e)} required />
            <input type="number" name="age" placeholder="Age" value={passenger.age} onChange={(e) => handlePassengerChange(index, e)} required />
            <select name="gender" value={passenger.gender} onChange={(e) => handlePassengerChange(index, e)} required>
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {passengers.length > 1 && (
              <button className="remove-btn" onClick={() => removePassenger(index)}>  ✖ </button>
            )}
          </div>
        ))}
        <button className="add-btn" onClick={addPassenger}>+ Add Passenger</button>
      </div>

      <div className="actions">
        <button className="back-btn" onClick={() => navigateTo(-1)}>← Back</button>
        <button className="confirm-btn" onClick={handleBooking}>Confirm Booking</button>
      </div>
    </div>
  );
}
