import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './UserStyling/UserNavbarStyle.css';
import { AuthContext } from '../contexts/AuthContext';

export default function UserNavbar() {
  const { isLogin, setIsLogin, user, setUser } = useContext(AuthContext);

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg custom-navbar shadow-lg fixed-top"
        style={{
          backgroundColor: 'rgba(153, 153, 203, 0.33)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold fs-4" to="/">
            <i className="bi bi-train-front-fill"></i> &nbsp;
            <span id="logo-text">Train-Go</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarUserNavbar"
            aria-controls="navbarUserNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-between" id="navbarUserNavbar">
            <div className="d-flex w-100 justify-content-center">
              <ul className="navbar-nav mb-2 mb-lg-0 gap-5">
                <li className="nav-item">
                  <Link className="nav-link nav-link-effect" to="/">
                    Book Ticket
                  </Link>
                </li>
                {isLogin && (
                  <li className="nav-item">
                    <Link className="nav-link nav-link-effect" to="/user/mybookings">
                      My Bookings
                    </Link>
                  </li>
                )}
                {!isLogin && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link nav-link-effect" to="/login">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link nav-link-effect" to="/register">
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {isLogin && (
              <div className="nav-item dropdown ms-auto">
                <Link className="nav-link dropdown-toggle d-flex align-items-center" to={'#'} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-person-circle fs-5 me-2"></i>{user.name}
                </Link>

                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li>
                    <button
                      className="dropdown-item text-danger fw-bold"
                      onClick={() => {
                        setIsLogin(false);
                        setUser(null);
                        window.location.href = '/';
                      }}
                    >
                      <i className="bi bi-box-arrow-right"></i> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

        </div>
      </nav>
    </div>
  );
}
