import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDataContext } from "../context/data_context";
import { Link } from "react-router-dom";
import { InputRow, Loading, Pagination } from ".";

const AllContracts = () => {
  const {
    contracts,
    contract,
    fetchContracts,
    search,
    loading,
    clearValues,
    role,
    del
  } = useDataContext();
  const [toggle, setToggle] = useState(false);
  const [page, setPage] = useState(0);
  const [cont, setCont] = useState([]);

  useEffect(() => {
    fetchContracts();
    // eslint-disable-next-line
  }, [contract, toggle, del]);

  useEffect(() => {
    if (loading) return;
    setCont(contracts[page]);
    // eslint-disable-next-line
  }, [loading, page]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setToggle(!toggle);
    clearValues();
  };

  const handleChnage = (index) => {
    setPage(index);
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
        {(role === "Sales" || role === "Admin") && (
          <div className="col-md-5 d-flex justify-content-end">
            <Link to="/create">
              <button className="btn btn-secondary btn-lg my-1">
                Create Contract
              </button>
            </Link>
          </div>
        )}
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
          {cont &&
            cont.map((contracts) => {
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
      <Pagination
        contracts={contracts}
        handleChange={handleChnage}
        page={page}
      />
    </div>
  );
};

export default AllContracts;
