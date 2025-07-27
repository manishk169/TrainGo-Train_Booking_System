import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavbarCSS.css';

export default function AdminNavbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg custom-navbar shadow-lg fixed-top" style={{
  backgroundColor: 'rgba(153, 153, 203, 0.33)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)'
}}>
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold fs-4" to={"/admin"}>
            <i className="bi bi-train-lightrail-front-fill"></i> &nbsp;Train-Go
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-4">
              <li className="nav-item">
                <Link className="nav-link nav-link-effect" to="/admin">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-link-effect" to="/admin/stations/">Stations</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-link-effect" to="/admin/trains/">Trains</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-link-effect" to="/admin/manage-schedules/view/all">Manage Schedules</Link>
              </li>

              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle d-flex align-items-center" to={'#'} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-person-circle fs-5 me-2"></i>
                  Hello! Admin
                </Link>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button className="dropdown-item text-danger fw-bold" onClick={() => {localStorage.removeItem('adminLoggedIn'); window.location.href = '/admin-login';}}>
                      <i className="bi bi-box-arrow-right me-2"></i> Logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
