import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDataContext } from "../context/data_context";
import { Link, useNavigate } from "react-router-dom";
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
    renewalFile,
    addEmails,
  } = useDataContext();
  const [toggle, setToggle] = useState(false);
  const [page, setPage] = useState(0);
  const [cont, setCont] = useState([]);
  const navigate = useNavigate();
  // const [emails, setEmails] = useState([]);

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

  const handleCreateContract = () => {
    clearValues();
    navigate("/create");
  };

  const add = (first, second, third, fourth, fifth, six, id, contractNo) => {
    const temp = new Set();
    const emails = [];
    if (first && first !== "clientproxymail@gmail.com") temp.add(first);
    if (second && second !== "clientproxymail@gmail.com") temp.add(second);
    if (third && third !== "clientproxymail@gmail.com") temp.add(third);
    if (fourth && fourth !== "clientproxymail@gmail.com") temp.add(fourth);
    if (fifth && fifth !== "clientproxymail@gmail.com") temp.add(fifth);
    if (six && six !== "clientproxymail@gmail.com") temp.add(six);
    [...temp].map((item) => {
      return emails.push({
        email: item,
        line: `https://cqr.sat9.in/feedback/${id}-${item.split("@")[0]}`,
        contract: contractNo,
      });
    });
    addEmails(emails);
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
          <>
            <div className="col-md-3 d-flex justify-content-center">
              <button
                className="btn btn-success btn-lg my-1"
                onClick={handleCreateContract}
              >
                Create Contract
              </button>
            </div>
            {renewalFile && (
              <div className="col-md-3 d-flex justify-content-center">
                <button className="btn btn-primary btn-sm my-1">
                  <a
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                    href={renewalFile}
                  >
                    Renewal Report
                  </a>
                </button>
              </div>
            )}
          </>
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
                billToContact1,
                billToContact2,
                billToContact3,
                shipToContact1,
                shipToContact2,
                shipToContact3,
              } = contracts;
              const { name } = shipToAddress;
              return (
                <tr key={_id}>
                  <td style={{ width: 150 }}>{`${contractNo} - ${type}`}</td>
                  <td className="mobile-table" style={{ width: 110 }}>
                    {moment(createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="mobile-table">{name}</td>
                  <td className="mobile-table" style={{ width: 110 }}>
                    {moment(startDate).format("DD/MM/YYYY")}
                  </td>
                  <td className="mobile-table" style={{ width: 110 }}>
                    {moment(endDate).format("DD/MM/YYYY")}
                  </td>
                  <td className="text-center" style={{ width: 120 }}>
                    <Link to={`/contract/${_id}`}>
                      <button className="btn btn-info">Details</button>
                    </Link>
                  </td>
                  {role === "Admin" && (
                    <td className="text-center" style={{ width: 120 }}>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          add(
                            billToContact1.email,
                            billToContact2.email,
                            billToContact3.email,
                            shipToContact1.email,
                            shipToContact2.email,
                            shipToContact3.email,
                            _id,
                            contractNo
                          )
                        }
                      >
                        Feedback
                      </button>
                    </td>
                  )}
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
