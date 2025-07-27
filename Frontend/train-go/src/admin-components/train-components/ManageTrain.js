import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

export default function ManageTrain() {
  const { trainId } = useParams()
  const navigate = useNavigate()

  const [train, setTrain] = useState(null)
  const [coachTypes, setcoachTypes] = useState([])
  const [selectedCoachTypeId, setSelectedCoachTypeId] = useState("")

  const getTrain = async () => {
    const response = await fetch(`http://localhost:8080/trains/${trainId}`)
    const responseObject = await response.json()
    setTrain(responseObject.data)
    console.log(responseObject.data);
  }

  const getAllcoachTypes = async () => {
    const response = await fetch("http://localhost:8080/coachtypes")
    const data = await response.json()
    setcoachTypes(data.data)
  }

  const assignCoachTypeToTrain = async () => {
    if (!selectedCoachTypeId) {
      alert("Please select a coach to assign.")
      return
    }
    const response = await fetch(`http://localhost:8080/trains/${trainId}/add-coachtype/${selectedCoachTypeId}`, {
      method: "PUT"
    })
    const data = await response.json()
    alert(data.message || "Coach assigned.")
    setSelectedCoachTypeId("")
    getTrain()
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getTrain();
        await getAllcoachTypes();
      } catch (error) {
        console.error("Error during data fetching:", error);
      }
    };

    fetchData();
  }, [trainId]);


  return (
    <div className="container py-5" style={{ maxWidth: "1000px" }}>
      <div className="mb-4 text-center">
        <h2 className="fw-bold">🛤 Manage Train - #{trainId}</h2>
        <p className="text-muted">Assign coachTypes, update details, or delete the train</p>
      </div>

      {train && (
        <>
          {/* Train Info */}
          <div className="bg-white rounded border shadow-sm p-4 mb-4">
            <h5 className="text-secondary mb-3">Train Information</h5>
            <div className="row mb-2">
              <div className="col-md-6"><span className="fw-bold">Train Number : </span> {train.trainNumber}</div>
              <div className="col-md-6"><span className="fw-bold">Train Name : </span> {train.trainName}</div>
            </div>

            <div className="row mb-4">
              <div className="col-md-12"><span className="fw-bold">Type : </span> {train.trainType}</div>
            </div>


            <div className="row mb-2">
              <div className="col-md-6"><span className="fw-bold">Source : </span>{train.source.stationName} - ({train.source.stationCode})</div>
              <div className="col-md-6"><span className="fw-bold">Destination : </span>{train.destination.stationName} - ({train.destination.stationCode})</div>
            </div>

          </div>

          {/* Assigned coachTypes Box */}
          <div className="bg-white border rounded shadow-sm p-4 mb-4">
            <h5 className="text-primary mb-3">🚋 Classes attached to this Train</h5>
            {train.coachTypes && train.coachTypes.length > 0 ? (
              <div className="row g-3">
                {train.coachTypes.map(coachType => (
                  <div className="col-md-4" key={coachType.id}>
                    <div className="position-relative border rounded overflow-hidden" style={{ height: "100px", width: "150px" }}>
                      {/* <img src="/coach-photo.png" className="w-100 h-100"/> */}
                      <div className="p-2 w-100"
                        style={{
                          position: "absolute",
                          top: "0",
                          left: "0",
                          backgroundColor: "rgba(248, 248, 248, 0.73)",
                          color: "black",
                        }}
                      >
                        <p className="mb-1"><strong>Type:</strong> {coachType.typeName}</p>
                        <p className="mb-0"><strong>Total Seats:</strong> {coachType.totalSeats}</p>
                      </div>
                    </div>
                  </div>

                ))}
              </div>
            ) : (
              <p className="text-muted">No coachTypes assigned yet.</p>
            )}
          </div>


          {/* Coach Assignment */}
          <div className="bg-light rounded border p-4 mb-4">
            <h5 className="text-success mb-3">➕ Add Coach to This Train</h5>
            <div className="row g-3 align-items-center">
              <div className="col-md-8">
                <select
                  className="form-select"
                  value={selectedCoachTypeId}
                  onChange={(e) => setSelectedCoachTypeId(e.target.value)}
                >
                  <option value="">-- Select Coach --</option>
                  {coachTypes && coachTypes.map(coachType => (
                    <option key={coachType.id} value={coachType.id}>
                      {coachType.typeName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <button className="btn btn-outline-success w-100" onClick={assignCoachTypeToTrain}>
                  Assign Coach
                </button>
              </div>
            </div>
          </div>


          {/* Train Schedules */}
          <div className="bg-white border rounded shadow-sm p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="text-warning">📅 Schedules for This Train</h5>
              <button
                className="btn btn-outline-warning"
                onClick={() => navigate(`/admin/manage-train/${trainId}/add-schedule`)}
              >
                ➕ Add New Schedule
              </button>
            </div>

            {train.schedules && train.schedules.length > 0 ? (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Schedule ID</th>
                    <th>Date</th>
                    <th>Departure Time</th>
                    <th>Arrival Time</th>
                  </tr>
                </thead>
                <tbody>
                  {train.schedules.slice(-3).map(schedule => (
                    <tr key={schedule.id}>
                      <td>{schedule.id}</td>
                      <td>{schedule.travelDate}</td>
                      <td>{schedule.departureTime}</td>
                      <td>{schedule.arrivalTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-muted">No schedules available for this train.</p>
            )}
            <div>
              <Link to={`/admin/manage-schedules/view/${trainId}`} className="btn btn-outline-secondary me-3"> View More Schedules</Link>
            </div>
          </div>


          {/* Train Actions */}
          {/* <div className="bg-white border rounded shadow-sm p-4 text-center">
            <h5 className="text-dark mb-3">⚙️ Train Actions</h5>
            <Link to={`/admin/manage-trains/update/${train.id}`} className="btn btn-outline-primary me-3">
              ✏️ Update Train
            </Link>
            <button className="btn btn-outline-danger" onClick={() => alert("Delete logic here")}>
              🗑 Delete Train
            </button>
          </div> */}
        </>
      )}
    </div>
  )
}
