import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminHome() {
  const [recentBookings, setRecentBookings] = useState([]);

  const getAllBookings = async () => {
    try {
      const response = await fetch(`http://localhost:8080/bookings`);
      const result = await response.json();
      setRecentBookings(result.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  return (
    <div className="container-fluid px-4" style={{ marginTop: 100 }}>
      {/* Admin Welcome Section */}
      <div className="mb-4">
        <h2 className="fw-bold">Admin Dashboard</h2>
        <p className="text-muted">Manage trains, users, and bookings efficiently</p>
        <hr />
      </div>

      <div className="row mb-5">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5>Add New Train</h5>
              <a href="/admin/trains/add" className="btn btn-primary mt-auto">Add Train</a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5>View All Trains</h5>
              <a href="/admin/trains" className="btn btn-secondary mt-auto">View</a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column justify-content-between">
              <h5>Manage Schedules</h5>
              <a href="/admin/manage-schedules/view/all" className="btn btn-success mt-auto">Manage</a>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">Recent Bookings</div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table mb-0 table-striped">
              <thead className="table-light">
                <tr>
                  <th>Booking ID</th>
                  <th>User</th>
                  <th>Train</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings && recentBookings.length > 0 ? (
                  recentBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.user?.name || "N/A"}</td>
                      <td>{booking.schedule?.train?.trainName || "N/A"}</td>
                      <td>{booking.schedule?.travelDate || "N/A"}</td>
                      <td>
                        <span className={`badge 
                          ${booking.bookingStatus === 'CONFIRMED' ? 'bg-success' :
                            booking.bookingStatus === 'PENDING' ? 'bg-warning text-dark' : 'bg-danger'}`}>
                          {booking.bookingStatus}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">No recent bookings found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
