import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import indianRailwaysLogo from '../../assets/indian-railways-logo.jpg';
import irctcLogo from '../../assets/irctc-logo-removebg-preview.png';


//import './ViewTicket.css';

export default function ViewTicket() {
  const { bookingId } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const getTicketDetails = async () => {
      const res = await fetch(`http://localhost:8080/bookings/viewticket/${bookingId}`);
      const data = await res.json();
      setTicket(data.data);
    };
    getTicketDetails();
  }, [bookingId]);

  if (!ticket) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container ticket-box mt-4 mb-5 p-5 shadow" style={{ backgroundColor: 'white' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <img src={indianRailwaysLogo} alt="Indian Railways Logo" className="ticket-logo" style={{ width: 80, height: 'auto' }} />

        <h5 className="text-center flex-grow-1 m-0">Electronic Reservation Slip (ERS)</h5>

        <img src={irctcLogo} alt="IRCTC Logo" className="ticket-logo" style={{ width: 150, height: 'auto' }} />
      </div>

      <div className="d-flex justify-content-between mb-3">
        <div>
          <strong>Boarding From</strong><br />
          {ticket.schedule.train.source.stationName} ({ticket.schedule.train.source.stationCode})
        </div>
        {/* <div className="text-center">
          <img src={indianRailwaysLogo} alt="arrow" className="arrow-icon" />
        </div> */}
        <div style={{ fontSize: '2.2rem', marginLeft: -150}}>&rarr;</div>
        <div>
          <strong>To</strong><br />
          {ticket.schedule.train.destination.stationName} ({ticket.schedule.train.destination.stationCode})
        </div>
      </div>

<div className="row mb-3">
        <div className="col-md-10"><strong>Departure<sup>*</sup></strong> {ticket.schedule.departureTime} on {ticket.schedule.travelDate}</div>
        <div className="col-md-2"><strong>Arrival<sup>*</sup></strong> {ticket.schedule.arrivalTime}</div>
      </div>
      <hr />
      <div className="row mb-3">
        <div className="col-md-5"><strong>PNR</strong>: {ticket.id}</div>
        <div className="col-md-4">{ticket.schedule.train.trainNumber} / {ticket.schedule.train.trainName}</div>
        <div className="col-md-3"><strong>Class</strong>: {ticket.coachType.typeName}</div>
        {/* <div className="col-md-2"><strong>Quota</strong>: General </div> */}
      </div>

      

      <h6 className="mt-4">Passenger Details</h6>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th><th>Name</th><th>Age</th><th>Gender</th><th>Booking Status</th><th>Current Status</th>
          </tr>
        </thead>
        <tbody>
          {ticket.passengers && ticket.passengers.map((p, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.gender}</td>
              <td>{ticket.bookingStatus}</td>
              <td>{ticket.bookingStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr/>
      <h6 className="mt-4">Payment Details</h6>
      <div className="row align-items-start mb-3">
        <div className="col-md-8">
          <p>Ticket Fare: ₹{ticket.totalFare}</p>
          <p>Service Charges: ₹ 0</p>
          <p>Total Fare: <strong> ₹{ticket.totalFare} </strong></p>
        </div>
        <div className="col-md-4 text-center">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=PNR No.:${ticket.id}, 

            Passengers:${ticket.passengers.map(p => `[${p.name}, Age: ${p.age}, Gender: ${p.gender}]`).join(' | ')}
            
            Train No:${ticket.schedule.train.trainNumber},

            Scheduled Departure: ${ticket.schedule.travelDate} ${ticket.schedule.departureTime}, 
            
            From : ${ticket.schedule.train.source.stationCode},
            To : ${ticket.schedule.train.destination.stationCode}
        
            Boarding Station: ${ticket.schedule.train.source.stationCode}
            
            Date of Journey: ${ticket.schedule.travelDate},
            Class: ${ticket.coachType.typeName}, Ticket Fare: Rs.${ticket.totalFare}`
          }
            alt="QR Code"
            className="img-fluid"
          />
        </div>
      </div>  

      <p className="mt-3 small text-muted">
        Please carry an original ID proof. E-tickets are valid with SMS/VRM/ERS.
      </p>

      <hr />
      <div className="text-center mt-3">
        <button className="btn btn-primary" onClick={() => window.print()}>
          Print Ticket
        </button>
      </div>
    </div>
  );
}
