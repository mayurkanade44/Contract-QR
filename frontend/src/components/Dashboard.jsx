import React, { useEffect, useState } from "react";
import { useDataContext } from "../context/data_context";
import { Link } from "react-router-dom";
import { BarChart, Loading } from ".";
import moment from "moment";

const Dashboard = () => {
  const { allServices, fetchServices, frequency } = useDataContext();
  const [jobs, setJobs] = useState({
    Jan: "",
    Feb: "",
    Mar: "",
    Apr: "",
    May: "",
    Jun: "",
    Jul: "",
    Aug: "",
    Sep: "",
    Oct: "",
    Nov: "",
    Dec: "",
  });

  const year = moment(new Date()).format("YY");
  const job = () => {
    const jan = allServices.filter((ser) =>
      ser.serviceDue.includes(`January ${year}`)
    );
    setJobs((jobs) => ({ ...jobs, Jan: jan.length }));
    const feb = allServices.filter((ser) =>
      ser.serviceDue.includes(`February ${year}`)
    );
    setJobs((jobs) => ({ ...jobs, Feb: feb.length }));
    const mar = allServices.filter((ser) =>
      ser.serviceDue.includes(`March ${year}`)
    );
    setJobs((jobs) => ({ ...jobs, Mar: mar.length }));
    const apr = allServices.filter((ser) =>
      ser.serviceDue.includes(`April ${year}`)
    );
    setJobs((jobs) => ({ ...jobs, Apr: apr.length }));
    const may = allServices.filter((ser) =>
      ser.serviceDue.includes(`May ${year}`)
    );
    setJobs((jobs) => ({ ...jobs, May: may.length }));
    const jun = allServices.filter((ser) =>
      ser.serviceDue.includes(`June ${year}`)
    );
    setJobs((jobs) => ({ ...jobs, Jun: jun.length }));
    const jul = allServices.filter((ser) =>
      ser.serviceDue.includes(`July ${year}`)
    );
    setJobs((jobs) => ({ ...jobs, Jul: jul.length }));
    const aug = allServices.filter((ser) =>
      ser.serviceDue.includes(`August ${year}`)
    );
    setJobs((jobs) => ({ ...jobs, Aug: aug.length }));
    const sep = allServices.filter((ser) =>
      ser.serviceDue.includes(`September ${year}`)
    );
    setJobs((jobs) => ({ ...jobs, Sep: sep.length }));
    const oct = allServices.filter((ser) =>
      ser.serviceDue.includes(`October ${year}`)
    );
    setJobs((jobs) => ({ ...jobs, Oct: oct.length }));
    const nov = allServices.filter((ser) =>
      ser.serviceDue.includes(`November ${year}`)
    );
    setJobs((jobs) => ({ ...jobs, Nov: nov.length }));
    const dec = allServices.filter((ser) =>
      ser.serviceDue.includes(`December ${year}`)
    );
    setJobs((jobs) => ({ ...jobs, Dec: dec.length }));
  };

  useEffect(() => {
    fetchServices();
    // eslint-disable-next-line
  }, [frequency]);

  useEffect(() => {
    job();
    // eslint-disable-next-line
  }, [allServices]);

  if (allServices.length === 0) {
    return <Loading />;
  }

  return (
    <div className="container my-2">
      <h3 className="text-center">Dashboard</h3>
      <div className="row my-2">
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
        <div className="col-md-12">
          <BarChart data={jobs} year={year} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
