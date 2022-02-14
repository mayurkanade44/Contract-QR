import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <h1>404, Page Not Found</h1>
      <Link className="ms-4" to="/">
        <button className="btn btn-outline-dark">Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
