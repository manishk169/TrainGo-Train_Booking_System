import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function MyBookings() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  const getAllBookings = async () => {
    let response = await fetch(`http://localhost:8080/bookings/${user.id}`, { method: "GET" });
    let responseObject = await response.json();
    setBookings(responseObject.data);
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-5 text-primary">
        <i className="bi bi-ticket-detailed me-2"></i>Your Train Bookings
      </h2>

      {bookings && bookings.length > 0 ? (
        bookings.map((booking) => (
          <div className="card mb-4 p-4 shadow-sm rounded-4 border-0" key={booking.id}>
            <div className="row align-items-center">
              <div className="col-md-8">
                <h4 className="text-dark fw-semibold mb-3">
                  <i className="bi bi-train-front me-2 text-primary"></i>
                  {booking.schedule.train.trainName}
                </h4>
                <div className="mb-2">
                  <span className="fw-medium me-3 text-secondary">
                    <i className="bi bi-calendar-event me-1"></i>
                    Date: <span className="text-dark">{booking.schedule.travelDate}</span>
                  </span>
                  <span className="fw-medium me-3 text-secondary">
                    <i className="bi bi-people-fill me-1"></i>
                    Passengers: <span className="text-dark">{booking.numberOfPassengers}</span>
                  </span>
                  <span className="fw-medium text-secondary">
                    <i className="bi bi-hash me-1"></i>
                    PNR No: <span className="text-dark">#{booking.id}</span>
                  </span>
                </div>
                <div className="mt-3">
                  <span className="badge bg-light text-dark me-2 p-2">
                    <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                    From: <strong>{booking.schedule.train.source.stationName}</strong>
                  </span>
                  <span className="badge bg-light text-dark p-2">
                    <i className="bi bi-geo-fill text-success me-1"></i>
                    To: <strong>{booking.schedule.train.destination.stationName}</strong>
                  </span>
                </div>
              </div>
              <div className="col-md-4 text-end mt-3 mt-md-0">
                <Link to={`/user/bookings/viewticket/${booking.id}`} className="btn btn-outline-primary rounded-pill px-4 py-2">
                  <i className="bi bi-eye-fill me-2"></i>View Ticket
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center mt-4">
          <div className="alert alert-warning shadow-sm">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>No bookings found.
          </div>
        </div>
      )}
    </div>
  );
}
