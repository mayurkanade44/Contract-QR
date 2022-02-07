import React from "react";
import moment from "moment";
import { useDataContext } from "../context/data_context";
import { Link } from "react-router-dom";

const AllContracts = () => {
  const { contracts } = useDataContext();
  console.log(contracts);
  return (
    <div className="container">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Contract No</th>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {contracts &&
            contracts.map((contracts) => {
              const { contractNo, _id, startDate, endDate, shipToAddress } =
                contracts;
              const { name } = shipToAddress[0];
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
