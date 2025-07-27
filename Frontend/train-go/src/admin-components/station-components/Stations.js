import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Stations() {
    const [stations, setStations] = useState(null)
    let [isDeleted, setIsDeleted] = useState(false)

    const getAllStations = async () => {
        let response = await fetch("http://localhost:8080/stations", { method: "GET" })
        let responseObject = await response.json()
        console.log(responseObject.data)
        setStations(responseObject.data)
        console.log(responseObject.data);

    }

    useEffect(() => {
        getAllStations()
    }, [isDeleted])

    const deleteStation = async (stationId) => {
          try {
            const response = await fetch(`http://localhost:8080/stations/${stationId}`, {
              method: 'DELETE'
            });
            const result = await response.json();
            setIsDeleted(!isDeleted);
            Swal.fire({
              title: 'Deleted!',
              text: 'Station deleted successfully.',
              icon: 'success',
              timer: 800,
              showConfirmButton: false
            });
          } catch (err) {
            console.error("Delete failed", err);
          }
        };

    return (
        <div className="container-fluid px-4" style={{ marginTop: 80 }}>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-semibold text-dark"> Stations </h2>
                <Link className="btn btn-success px-4 rounded-pill" to={"/admin/stations/add/"}>
                    + Add Station
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
                                <th>Station code</th>
                                <th>Station Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stations && stations.map(station => (
                                <tr className="text-capitalize" key={station.id}>
                                    <td>{station.id}</td>
                                    <td>{station.stationCode}</td>
                                    <td>{station.stationName}</td>
                                    <td>
                                        <button className='btn btn-danger btn-sm' onClick={() => deleteStation(station.id)}><i class="bi bi-trash3"></i></button>
                                    </td>
                                </tr>
                            ))}
                            {!stations && (
                                <tr>
                                    <td colSpan="5" className="text-muted py-4">No Stations Found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )

}
