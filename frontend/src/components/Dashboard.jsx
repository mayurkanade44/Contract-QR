import React, { useEffect, useState } from "react";
import { useDataContext } from "../context/data_context";
import { Link } from "react-router-dom";
import { BarChart, Loading, VerticalChart, Modal } from ".";
import moment from "moment";

const Dashboard = () => {
  const {
    frequency,
    businessCount,
    generateBusinessReport,
    modal,
    jobStats,
    getJobStats,
    loading,
    serviceStats,
    role,
  } = useDataContext();
  const [switchStats, setSwitchStats] = useState(false);

  const year = moment(new Date()).format("YY");

  useEffect(() => {
    getJobStats();
    // eslint-disable-next-line
  }, [frequency]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container my-2">
      {modal && <Modal />}
      <div className="row gx-2">
        <div className="col-md-6">
          <Link
            to="/"
            className="d-flex align-items-center justify-content-center bg-dark"
            style={{ height: 60, textDecoration: "none" }}
          >
            <h4 className="text-info">All Contracts</h4>
          </Link>
        </div>

        <Link
          to="/create"
          className="col-md-6 d-flex align-items-center justify-content-center bg-secondary"
          style={{ height: 60, textDecoration: "none" }}
        >
          <h4 className="text-info">Create New Contract</h4>
        </Link>

        <h3 className="text-center my-2">All Business Count</h3>
        {businessCount &&
          Object.entries(businessCount).map((item, index) => {
            return (
              <div className="col-md-3 my-2 text-center" key={index}>
                <div
                  className={`p-1 ${
                    index % 2 ? "bg-light border border-warning" : "bg-dark"
                  }`}
                >
                  <button
                    className={`btn btn-lg ${
                      index % 2 ? "btn-light" : "btn-dark"
                    }`}
                    onClick={() => generateBusinessReport(item[0])}
                    disabled={role === "Admin" ? false : true}
                  >
                    {`${item[0]} - ${item[1]}`}
                  </button>
                </div>
              </div>
            );
          })}
        <hr className="my-2" />
        <div className="col-md-12">
          <div className="text-center">
            <button
              onClick={() => setSwitchStats(false)}
              className="btn btn-primary me-3"
            >
              All Jobs
            </button>
            <button
              onClick={() => setSwitchStats(true)}
              className="btn btn-warning"
            >
              All Service
            </button>
          </div>
          <h3 className="text-center mt-2">
            {switchStats ? "All Services" : `Number Of Jobs In 20${year}`}
          </h3>
          {switchStats ? (
            <VerticalChart data={serviceStats} />
          ) : (
            <BarChart data={jobStats} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
