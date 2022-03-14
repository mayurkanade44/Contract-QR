import React from "react";
import { Link } from "react-router-dom";

const AllCards = ({ data, area, preferred, role }) => {
  return (
    <div>
      {data && (
        <table className="table table-striped table-bordered border-dark ">
          <thead>
            <tr>
              <th>No</th>
              <th>Services</th>
              <th>Frequency</th>
              <th>Area</th>
              <th>Day &amp; Time</th>
              {(role === "Operator" || role === "Admin") && <th>Update</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => {
              const { frequency, service, _id } = data;
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{`${service}`}</td>
                  <td>{frequency}</td>
                  <td>{area}</td>
                  <td>{`${preferred.day} / ${preferred.time}`}</td>
                  {(role === "Operator" || role === "Admin") && (
                    <td>
                      <Link to={`/service/${_id}`}>
                        <button className="btn btn-primary">Update</button>
                      </Link>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllCards;
