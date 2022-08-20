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
    del,
    searchSD,
    searchED,
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
      <div className="row my-3">
        <div className="col-md-6">
          <h2 className="text-center all-contracts">All Contracts</h2>
        </div>
        {(role === "Sales" || role === "Admin") && (
          <div className="col-md-6 d-flex justify-content-center">
            <Link to="/create">
              <button className="btn btn-success btn-lg my-1">
                Create Contract
              </button>
            </Link>
          </div>
        )}
      </div>
      <div className="row">
        <div className="col-md-4">
          <InputRow label="Search" type="text" name="search" value={search} />
        </div>
        <div className="col-md-3 mobile-table">
          <InputRow
            label="From :"
            type="date"
            name="searchSD"
            value={searchSD}
            width={170}
          />
        </div>
        <div className="col-md-3 mobile-table">
          <InputRow
            label="To :"
            type="date"
            name="searchED"
            value={searchED}
            width={170}
          />
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
        <div className="col-md-1 my-1">
          <button className="btn btn-dark" onClick={handleSubmit}>
            Reset
          </button>
        </div>
      </div>
      {contracts.length === 0 && (
        <h4 className="text-center m-2 text-danger">No Contract Found</h4>
      )}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Contract No</th>
            <th className="mobile-table">Created At</th>
            <th className="mobile-table">Ship To Name</th>
            <th className="mobile-table">Start Date</th>
            <th className="mobile-table">End Date</th>
          </tr>
        </thead>

        <tbody>
          {cont &&
            cont.map((contracts) => {
              const {
                contractNo,
                _id,
                startDate,
                endDate,
                shipToAddress,
                type,
                createdAt,
              } = contracts;
              const { name } = shipToAddress;
              return (
                <tr key={_id}>
                  <td style={{ width: 200 }}>{`${contractNo} - ${type}`}</td>
                  <td className="mobile-table" style={{ width: 130 }}>
                    {moment(createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="mobile-table">{name}</td>
                  <td className="mobile-table" style={{ width: 130 }}>
                    {moment(startDate).format("DD/MM/YYYY")}
                  </td>
                  <td className="mobile-table" style={{ width: 130 }}>
                    {moment(endDate).format("DD/MM/YYYY")}
                  </td>
                  <td className="text-center" style={{ width: 120 }}>
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
