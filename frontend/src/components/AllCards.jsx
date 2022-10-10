import { Link } from "react-router-dom";
import { saveAs } from "file-saver";
import { useDataContext } from "../context/data_context";
import Modal from "./Modal";

const AllCards = ({ data, role, contractNo }) => {
  const { generateReport, modal } = useDataContext();
  const downloadImage = (url, name) => {
    saveAs(url, `${name}.png`); // Put your image url here.
  };

  return (
    <div>
      {modal && <Modal />}
      {data && (
        <table className="table table-striped table-bordered border-dark ">
          <thead>
            <tr>
              <th>No</th>
              <th className="text-center">Services</th>
              <th className="text-center" style={{ width: 120 }}>
                Area
              </th>
              <th className="text-center">Frequency</th>
              {(role === "Back Office" ||
                role === "Admin" ||
                role === "Sales") && <th className="text-center">Download</th>}
              {(role === "Operator" || role === "Admin") && (
                <th className="text-center">Update</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => {
              const { frequency, service, _id, card, qr, area, serviceReport } =
                data;
              const temp = `${contractNo}_${frequency}`;
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{`${service}`}</td>
                  <td>{area}</td>
                  <td className="frequency">{frequency}</td>
                  {(role === "Back Office" ||
                    role === "Admin" ||
                    role === "Sales") && (
                    <td className="download">
                      <div className="row ">
                        <div className="col-md-4 d-flex justify-content-around ">
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
                        <div className="col-md-4 d-flex justify-content-around">
                          <button
                            className="btn btn-outline-success"
                            disabled={qr ? false : true}
                            onClick={() => downloadImage(qr, temp)}
                          >
                            QR Code
                          </button>
                        </div>
                        {role === "Admin" && (
                          <div className="col-md-4 d-flex justify-content-around ">
                            <button
                              className="btn btn-success"
                              onClick={() => generateReport(_id)}
                              disabled={serviceReport ? false : true}
                            >
                              Service Report
                            </button>
                          </div>
                        )}
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
