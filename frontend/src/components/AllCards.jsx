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
              <th className="text-center">Services</th>
              <th className="text-center">Frequency</th>
              {(role === "Back Office" || role === "Admin") && (
                <th className="text-center">Download</th>
              )}
              {(role === "Operator" || role === "Admin") && (
                <th className="text-center">Update</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => {
              const { frequency, service, _id, card, qr } = data;
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{`${service}`}</td>
                  <td className="frequency">{frequency}</td>
                  {(role === "Back Office" || role === "Admin") && (
                    <td className="download">
                      <div className="row">
                        <div className="col-md-6 d-flex justify-content-around">
                          <button
                            className="btn btn-success"
                            disabled={card ? false : true}
                          >
                            <a
                              style={{
                                textDecoration: "none",
                                color: "white",
                              }}
                              href={card}
                            >
                              Service Card
                            </a>
                          </button>
                        </div>
                        <div className="col-md-6 d-flex justify-content-around">
                          <button
                            className="btn btn-outline-success"
                            disabled={qr ? false : true}
                          >
                            <a
                              style={{
                                textDecoration: "none",
                                color: "black",
                              }}
                              href={qr}
                              target="_blank"
                              rel="noreferrer"
                            >
                              QR Code
                            </a>
                          </button>
                        </div>
                      </div>
                    </td>
                  )}
                  {(role === "Operator" || role === "Admin") && (
                    <td className="update">
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
