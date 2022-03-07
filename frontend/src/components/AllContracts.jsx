import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDataContext } from "../context/data_context";
import { Link } from "react-router-dom";
import { InputRow } from ".";
import Loading from "./Loading";

const AllContracts = () => {
  const {
    contracts,
    contract,
    fetchContracts,
    search,
    loading,
    clearValues,
    fetchServices,
    allServices
  } = useDataContext();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    fetchContracts();
    fetchServices();
    // eslint-disable-next-line
  }, [contract, toggle]);


  var start = moment(new Date())

  if(allServices) {
    const serv = allServices.filter((ser) =>
      ser.serviceDue.includes(start.format("MMMM YY"))
    );
    console.log(serv.length);
  }

  console.log(allServices);

  const handleSubmit = (e) => {
    e.preventDefault();
    setToggle(!toggle);
    clearValues();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="row my-2">
        <div className="col-md-4">
          <InputRow label="Search" type="text" name="search" value={search} />
        </div>
        <div className="col-md-1 mt-1">
          <button
            className="btn btn-dark"
            onClick={(e) => {
              setToggle(!toggle);
            }}
          >
            Search
          </button>
        </div>
        <div className="col-md-1 mt-1">
          <button className="btn btn-dark" onClick={handleSubmit}>
            Reset
          </button>
        </div>
        <div className="col-md-5 d-flex justify-content-end">
          <Link to="/create">
            <button className="btn btn-secondary btn-lg my-1">
              Create Contract
            </button>
          </Link>
        </div>
      </div>
      {contracts.length === 0 && (
        <h4 className="text-center m-2 text-danger">No Contract Found</h4>
      )}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Contract No</th>
            <th>Ship To Name</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>

        <tbody>
          {contracts &&
            contracts.map((contracts) => {
              const { contractNo, _id, startDate, endDate, shipToAddress } =
                contracts;
              const { name } = shipToAddress;
              return (
                <tr key={_id}>
                  <td>{contractNo}</td>
                  <td>{name}</td>
                  <td>{moment(startDate).format("DD/MM/YYYY")}</td>
                  <td>{moment(endDate).format("DD/MM/YYYY")}</td>
                  <td className="text-center">
                    <Link to={`/contract/${_id}`}>
                      <button className="btn btn-info">Details</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AllContracts;
