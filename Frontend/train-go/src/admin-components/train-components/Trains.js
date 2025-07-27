import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Trains() {
  const [trains, setTrains] = useState(null)

  const getAllTrains = async () => {
    let response = await fetch("http://localhost:8080/trains", { method: "GET" })
    let responseObject = await response.json()
    console.log(responseObject.data)
    setTrains(responseObject.data)
    //console.log(responseObject.data);
    
  }

  useEffect(() => {
    getAllTrains()
  }, [])

  return (
    <div className="container-fluid px-4" style={{marginTop:80}}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-semibold text-dark">🚆 Train Dashboard</h2>
        <Link className="btn btn-success px-4 rounded-pill" to={"/admin/trains/add/"}>
          + Add Train
        </Link>
      </div>

      {/* Table Container */}
      <div
        className="p-4 rounded-4 shadow-sm"
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Train Number</th>
                <th>Train Name</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {trains && trains.map(train => (
                <tr className="text-capitalize" key={train.id}>
                  <td>{train.id}</td>
                  <td>{train.trainNumber}</td>
                  <td>{train.trainName}</td>
                  <td>{train.trainType}</td>
                  <td>
                    <Link
                      className="btn btn-outline-dark btn-sm rounded-pill"
                      to={`/admin/trains/manage-train/${train.id}`}
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
              {!trains && (
                <tr>
                  <td colSpan="5" className="text-muted py-4">No Trains Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
