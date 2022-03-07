import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container my-2">
      <h3 className="text-center">Dashboard</h3>
      <div className="row my-4">
        <Link
          to="/"
          className="col-md-6 d-flex align-items-center justify-content-center bg-dark"
          style={{ height: 100, textDecoration: "none" }}
        >
          <h4 className="text-info">All Contracts</h4>
        </Link>
        <Link
          to="/create"
          className="col-md-6 d-flex align-items-center justify-content-center bg-secondary"
          style={{ height: 100, textDecoration: "none" }}
        >
          <h4 className="text-info">Create New Contract</h4>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
