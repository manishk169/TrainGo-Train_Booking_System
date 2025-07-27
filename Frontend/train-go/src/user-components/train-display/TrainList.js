import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export default function TrainList({ trains }) {
  let { isLogin, setLogin, user, setUser } = useContext(AuthContext)
  const navigateTo = useNavigate();
  const [selectedCoach, setSelectedCoach] = useState({});

  console.log(user);
  // let printUser = isLogin && user ? ({user}):('no user found');
  // console.log("printed user "+printUser); 


  const handleSelectCoach = (trainId, coach, schedule) => {
    // Find seat availability for this coach
    const seatInfo = schedule.seatAvailabilityList.find(
      (seat) => seat.coachType.id === coach.id
    );

    if (!seatInfo) {
      alert("Coach fare info not available.");
      return;
    }

    setSelectedCoach((prev) => ({
      ...prev,
      [trainId]: {
        coach,
        seatInfo
      }
    }));
  };

  const handleBookNow = (schedule) => {
    const selected = selectedCoach[schedule.train.id];
    if (!selected) {
      alert("Please select a coach type first.");
      return;
    }

    //if user is logged in then the user will be allowed to book ticket
    if (!user) {
      navigateTo('/login');
    }
    else {
      navigateTo('/user/book-ticket', {
        state: {
          train: schedule.train,
          schedule: schedule,
          selectedCoach: selected.coach,
          seatInfo: selected.seatInfo,
        }
      });
    }
  };

  if (!trains || trains.length === 0) {
    return <div className="alert alert-danger text-center">No trains found for your criteria.</div>;
  }

  return (
    <div>
      {trains.map((schedule) => (
        <div className="card shadow-sm mb-4 mx-auto" key={schedule.id} style={{ maxWidth: '900px' }}>
          <div className="card-body p-0">

            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap p-3" style={{ backgroundColor: '#f4f2f2' }}>
              <div className="fw-bold fs-5">{schedule.train.trainName} ({schedule.train.trainNumber})</div>
              <div>{schedule.travelDate}</div>
              <div className="text-muted small">Runs On: M T W T F S S</div>
            </div>

            <div className="row text-center mb-4">
              <div className="col-md-4">
                <strong>{schedule.departureTime}</strong>
                <div className="text-muted small">{schedule.train.source.stationName}</div>
                <div className="text-muted small fw-bold">{schedule.train.source.stationCode}</div>
              </div>
              <div className="col-md-4 d-flex align-items-center justify-content-center">
                <span className="fw-bold">➝</span>
              </div>
              <div className="col-md-4">
                <strong>{schedule.arrivalTime}</strong>
                <div className="text-muted small">{schedule.train.destination.stationName}</div>
                <div className="text-muted small fw-bold">{schedule.train.destination.stationCode}</div>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2 mb-3 px-3">
              {schedule.train.coachTypes.map((coach) => {
                const seatData = schedule.seatAvailabilityList.find(seat => seat.coachType.id === coach.id);

                return (
                  <div key={coach.id} className={`p-2 rounded border`}
                    style={{ cursor: 'pointer', backgroundColor: selectedCoach[schedule.train.id]?.coach.id === coach.id ? '#f1e9e2' : '#f8f9fa' }}
                    onClick={() => handleSelectCoach(schedule.train.id, coach, schedule)}
                  >
                    <div className="fw-semibold">{coach.typeName}</div>
                    <div className="fw-bold" style={{ color: '#00ff13' }}>
                      {seatData ? `AVAILABLE: ${seatData.availableSeats}` : 'N/A'}
                    </div>
                    <div className="text-primary fw-bold">
                      {/* ₹ {seatData ? seatData.fare : 'N/A'} */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card-footer d-flex align-items-center gap-3">
            <button className="btn btn-warning" onClick={() => handleBookNow(schedule)}>Book Now</button>
            <span className='fw-bold'>
              ₹ {
                selectedCoach[schedule.train.id]?.seatInfo?.fare
                  ? selectedCoach[schedule.train.id].seatInfo.fare
                  : '---'
              }
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
