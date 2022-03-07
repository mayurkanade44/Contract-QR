import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDataContext } from "../context/data_context";

const Navbar = () => {
  const { user, logout } = useDataContext();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <span className="nav-link active" aria-current="page">
                  <h4>Contract`</h4>
                </span>
              </li>
            </ul>
            {user && (
              <ul className="navbar-nav nav-item ms-auto dropdown">
                <li className="nav-item">
                  <Link to="/" className="nav-link active" aria-current="page">
                    <h4>Home</h4>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link active" aria-current="page">
                    <h4>Dashboard</h4>
                  </Link>
                </li>
                <h4
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaUserCircle className="mx-2" />
                  <span>{user && user}</span>
                </h4>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <button onClick={logout} className="dropdown-item">
                      Logout
                    </button>
                  </li>
                </ul>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
