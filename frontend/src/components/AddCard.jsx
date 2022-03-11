import { useEffect, useState } from "react";
import { useDataContext } from "../context/data_context";
import { InputSelect, Alert } from ".";
import { useParams } from "react-router-dom";
import moment from "moment";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";

const AddCard = () => {
  const [dueMonths, setDueMonths] = useState([]);
  const [add, setAdd] = useState(true);
  const [value, setValue] = useState("");

  const handleOnchange = (val) => {
    setValue(val);
  };

  const {
    frequency,
    fetchSingleContract,
    singleContract,
    createCard,
    createCards,
    treatmentLocation,
    handleChange,
    showAlert,
    loading,
    displayAlert,
  } = useDataContext();

  const { contractNo, startDate, endDate, services } = singleContract;

  const frequencyList = [
    "Daily",
    "Thrice A Week",
    "Twice A Week",
    "Weekly",
    "Thrice A Month",
    "Fortnightly",
    "Monthly",
    "Alternate Monthly",
    "Quarterly",
    "Thrice A Year",
    "Twice A Year",
    "Yearly",
  ];

  const serviceList = [
    { label: "Green Shield", value: "Green Shield" },
    { label: "Ratrid", value: "Ratrid" },
    { label: "Termiproof", value: "Termiproof" },
    { label: "Bugfree", value: "Bugfree" },
    { label: "Flyban", value: "Flyban" },
    { label: "Mosquit", value: "Mosquit" },
    { label: "Woodsafe", value: "Woodsafe" },
    { label: "FX1", value: "FX1" },
    { label: "Others", value: "Others" },
  ];

  const { id } = useParams();

  const dueRange = (startDate, endDate) => {
    const startMonth = startDate.split("T")[0];
    const endMonth = endDate.split("T")[0];

    var start = moment(startMonth);
    var end = moment(endMonth);

    var months = [start.format("MMMM YY")];
    end.subtract(1, "month"); //Substract one month to exclude endDate itself

    var month = moment(start); //clone the startDate
    while (month < end) {
      month.add(1, "month");
      months.push(month.format("MMMM YY"));
    }
    const due = [];
    months.forEach((date, index) => {
      if (frequency && frequency === "Thrice A Year" && index % 4 === 0) {
        return due.push(date);
      } else if (frequency && frequency === "Quarterly" && index % 3 === 0) {
        return due.push(date);
      } else if (frequency && frequency === "Twice A Year" && index % 6 === 0) {
        return due.push(date);
      } else if (
        frequency &&
        frequency === "Alternate Monthly" &&
        index % 2 === 0
      ) {
        return due.push(date);
      } else if (
        frequency &&
        (frequency === "Daily" ||
          frequency === "Weekly" ||
          frequency === "Twice A Week" ||
          frequency === "Thrice A Week" ||
          frequency === "Thrice A Month" ||
          frequency === "Fortnightly" ||
          frequency === "Monthly") &&
        index % 1 === 0
      ) {
        return due.push(date);
      }
    });
    setDueMonths(due);
  };

  useEffect(() => {
    fetchSingleContract(id);
    if ((startDate, endDate)) {
      dueRange(startDate, endDate);
    }
    // eslint-disable-next-line
  }, [id, startDate, frequency, add]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createCard(dueMonths, value);
    setAdd(!add);
  };

  const generateCards = (e) => {
    e.preventDefault();
    setAdd(!add);
    createCards(id);
    displayAlert();
  };

  return (
    <div className="container my-3">
      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-md-4">
            <h4>{`Contract Number: ${contractNo}`}</h4>
          </div>
          <div className="col-md-4">
            <h4>{`Start Date: ${moment(startDate).format("DD/MM/YYYY")}`}</h4>
          </div>
          <div className="col-md-4">
            <h4>{`End Date: ${moment(endDate).format("DD/MM/YYYY")}`}</h4>
          </div>
          <hr />
          <table className="table table-striped table-bordered border-dark ">
            <thead>
              <tr>
                <th>No</th>
                <th className="text-center">Services</th>
                <th className="text-center">Frequency</th>
                <th className="text-center">Download</th>
              </tr>
            </thead>
            <tbody>
              {services &&
                services.map((data, index) => {
                  const { frequency, service, card, qr } = data;
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{service}</td>
                      <td>{frequency}</td>
                      <td>
                        <div className="row">
                          <div className="col-md-6">
                            <button
                              className="btn btn-dark"
                              disabled={card ? false : true}
                            >
                              <a
                                style={{
                                  textDecoration: "none",
                                  color: "white",
                                }}
                                href={card}
                              >
                                Download
                              </a>
                            </button>
                          </div>
                          <div className="col-md-6">
                            <button
                              className="btn btn-dark"
                              disabled={qr ? false : true}
                            >
                              <a
                                style={{
                                  textDecoration: "none",
                                  color: "white",
                                }}
                                href={qr}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Download
                              </a>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="col-lg-4">
            <InputSelect
              label="Frequency"
              name="frequency"
              value={frequency}
              data={frequencyList}
            />
          </div>
          <div className="col-lg-4">
            <div className="app">
              <div className="row mt-2">
                <div className="col-lg-3">
                  <div className="preview-values">
                    <h4>Services</h4>
                  </div>
                </div>
                <div className="col-lg-6">
                  <MultiSelect
                    onChange={handleOnchange}
                    options={serviceList}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-floating">
              <textarea
                className="form-control"
                id="floatingTextarea2"
                name="treatmentLocation"
                placeholder="Location To Be Treated"
                value={treatmentLocation}
                onChange={handleChange}
                style={{ height: 120 }}
                required
              ></textarea>
              <label htmlFor="floatingTextarea2">Location To Be Treated</label>
            </div>
          </div>
          <div className="col-lg-1">
            <button className="btn btn-dark" type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
      <div className="row">
        <div className="col-md-2">
          <button
            className="btn btn-dark"
            type="submit"
            onClick={generateCards}
            disabled={loading ? true : false}
          >
            Create Cards
          </button>
        </div>
        <div className="col-md-4">{showAlert && <Alert />}</div>
      </div>
    </div>
  );
};

export default AddCard;
