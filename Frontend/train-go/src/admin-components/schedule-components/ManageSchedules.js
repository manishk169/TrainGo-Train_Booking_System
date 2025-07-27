import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ManageSchedules() {
  const { trainId } = useParams();

  let [schedules, setSchedules] = useState([]);
  let [isDeleted, setIsDeleted] = useState(false)
  let [message, setMessage] = useState('')


  const getAllSchedules = async () => {
    if (trainId == "all") {
      let response = await fetch("http://localhost:8080/schedules", { method: "GET" })
      let responseObject = await response.json()
      // console.log(responseObject.data)
      setSchedules(responseObject.data)
      setMessage(responseObject.message)
      console.log("Message for all train"+ message);
      
    }
    else {
      let response = await fetch(`http://localhost:8080/schedules/train/${trainId}`, { method: "GET" })
      let responseObject = await response.json()
      setSchedules(responseObject.data)
      setMessage(responseObject.message)
      console.log("Message for particualr train" + message);
      
    }
  }

  useEffect(() => {
    getAllSchedules();
  }, [trainId, isDeleted]);

    const deleteSchedule = async (scheduleId) => {
      try {
        const response = await fetch(`http://localhost:8080/schedules/${scheduleId}`, {
          method: 'DELETE'
        });
        const result = await response.json();
        setIsDeleted(!isDeleted);
        Swal.fire({
          title: 'Deleted!',
          text: 'Schedule deleted successfully.',
          icon: 'success',
          timer: 800,
          showConfirmButton: false
        });
      } catch (err) {
        console.error("Delete failed", err);
      }
    };

  console.log("message is " + message);
  
  return (
    <div>
    {schedules &&
    <div className='container-fluid px-4' style={{ marginTop: 100 }}>
      <h2 className='text-center'>Manage Schedules</h2>
      { message && <div className="h3 text-center text-primary">{message}</div>}

      <table className="table table-bordered table-hover mt-3 text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Train Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map(schedule => (
            <tr key={schedule.id}>
              <td>{schedule.id}</td>
              <td>{schedule.travelDate}</td>
              <td>{schedule.departureTime}</td>
              <td>{schedule.arrivalTime}</td>
              <td>{schedule.train.trainName || 'N/A'}</td>
              <td>
                <Link  to={`/admin/manage-schedules/update/${schedule.id}`} className='btn btn-warning btn-sm'> <i class="bi bi-pencil-square"></i> </Link> &nbsp;
                <button className='btn btn-danger btn-sm' onClick={() => deleteSchedule(schedule.id)}><i class="bi bi-trash3"></i></button>
              </td>
            </tr>
          ))}
          {schedules.length === 0 && (
            <tr>
              <td colSpan="6" className='text-muted'>No schedules found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>}
    </div>
  );
}
