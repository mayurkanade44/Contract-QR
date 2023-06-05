import { useEffect, useState } from "react";
import { useDataContext } from "../context/data_context";
import { InputSelect, Alert, Loading, InputRow } from ".";
import { useParams } from "react-router-dom";
import moment from "moment";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";

const AddCard = () => {
  const [dueMonths, setDueMonths] = useState([]);
  const [add, setAdd] = useState(true);
  const [value, setValue] = useState("");
  const [chemicals, setChemicals] = useState([]);

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
    role,
    adminList,
    area,
    business,
    allValues,
    deleteService,
    del,
    ratrid,
    editService,
    user,
  } = useDataContext();

  const { contractNo, startDate, endDate, services } = singleContract;

  const frequencyList = [
    "Daily",
    "Single",
    "Alternate Days",
    "Thrice A Week",
    "Twice A Week",
    "Weekly",
    "Thrice A Month",
    "Fortnightly",
    "Monthly",
    "Alternate Monthly",
    "Quarterly",
    "3 Services Once In 4 Months",
    "2 Services Once In 6 Months",
    "As An When Called",
    "Multi Frequency",
    "Other",
  ];

  const businessList = [];
  const serviceChemicalsList = [];
  if (adminList) {
    adminList.map(
      (item) =>
        (item.business !== undefined && businessList.push(item.business)) ||
        (item.serviceChemicals !== undefined &&
          serviceChemicalsList.push(item.serviceChemicals))
    );
  }

  const sort = serviceChemicalsList.sort((a, b) => {
    return a.label.localeCompare(b.label);
  });

  const home = [
    "1 RK",
    "1 BHK",
    "2 BHK",
    "3 BHK",
    "4 BHK",
    "5 BHK",
    "Bungalow",
  ];

  const ratridOp = ["No", "Yes"];

  const addChemicals = () => {
    const temp = [];
    const value1 = value.split(",");

    value1.forEach((item) => {
      serviceChemicalsList.forEach((item1) => {
        return item1.label === item && temp.push(item1.chemical);
      });
    });

    return setChemicals(temp);
  };

  const { id } = useParams();

  const dueRange = (startDate, endDate) => {
    const startMonth = startDate.split("T")[0];
    const endMonth = endDate.split("T")[0];

    var start = moment(startMonth);
    var end = moment(endMonth);

    const curDate = start.format("DD");

    var months = [start.format("MMM YY")];
    end.subtract(1, "month"); //Substract one month to exclude endDate itself

    var month = moment(start);
    while (month < end) {
      month.add(1, "month");
      months.push(month.format("MMM YY"));
    }
    const due = [];
    months.forEach((date, index) => {
      if (startDate === endDate && index === 0) {
        return due.push(`${curDate} ${date}, Onwards`);
      }
      if (
        frequency &&
        frequency === "3 Services Once In 4 Months" &&
        index % 4 === 0
      ) {
        return due.push(date);
      }
      if (frequency && frequency === "Quarterly" && index % 3 === 0) {
        return due.push(date);
      }
      if (frequency && frequency === "Single" && index === 0) {
        return due.push(date);
      }
      if (
        frequency &&
        frequency === "2 Services Once In 6 Months" &&
        index % 6 === 0
      ) {
        return due.push(date);
      }
      if (frequency && frequency === "Alternate Monthly" && index % 2 === 0) {
        return due.push(date);
      }
      if (
        frequency &&
        (frequency === "Daily" ||
          frequency === "Weekly" ||
          frequency === "Multi Frequency" ||
          frequency === "Alternate Days" ||
          frequency === "As An When Called" ||
          frequency === "Twice A Week" ||
          frequency === "Thrice A Week" ||
          frequency === "Thrice A Month" ||
          frequency === "Fortnightly" ||
          frequency === "Other" ||
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

    // eslint-disable-next-line
  }, [id, add, del]);

  useEffect(() => {
    if ((startDate, endDate)) {
      dueRange(startDate, endDate);
    }
    // eslint-disable-next-line
  }, [startDate, frequency]);

  useEffect(() => {
    allValues();
    addChemicals();
    // eslint-disable-next-line
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const _id = "hkjnhk";
    createCard(dueMonths, value, chemicals, _id);
    setAdd(!add);
    displayAlert();
  };

  const generateCards = (e) => {
    e.preventDefault();
    createCards(id);
    setAdd(!add);
    displayAlert();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container my-3">
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
              <th className="text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {services &&
              services.map((data, index) => {
                const {
                  frequency,
                  service,
                  _id,
                  treatmentLocation,
                  business,
                  area,
                } = data;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{`${service},`}</td>
                    <td>{frequency}</td>
                    <td>
                      {role === "Admin" && (
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteService(_id)}
                        >
                          Delete
                        </button>
                      )}
                      <span className="invisible">a</span>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          editService({
                            frequency,
                            business,
                            treatmentLocation,
                            area,
                            _id,
                          })
                        }
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {(role === "Sales" || role === "Admin") && (
        <>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4">
                <InputSelect
                  label="Business"
                  name="business"
                  value={business}
                  data={businessList}
                />
              </div>
              {!home.includes(business) && (
                <div className="col-md-3">
                  <InputRow
                    label="Area :"
                    placeholder="in sqft"
                    type="text"
                    name="area"
                    value={area}
                  />
                </div>
              )}
              <div className="col-md-5">
                <div className="row my-2">
                  <div className="col-md-8">
                    <h4>Ratrid with other services:</h4>
                  </div>
                  <div className="col-md-3">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      name="ratrid"
                      value={ratrid}
                      onChange={handleChange}
                    >
                      {ratridOp.map((data) => {
                        return (
                          <option value={data} key={data}>
                            {data}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>

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
                        options={sort}
                        className="multiselect"
                        required
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
                    style={{ height: 100 }}
                    required
                  ></textarea>
                  <label htmlFor="floatingTextarea2">
                    Location To Be Treated
                  </label>
                </div>
              </div>
              <div className="col-lg-1">
                <button
                  className="btn btn-dark"
                  type="submit"
                  disabled={loading ? true : false}
                >
                  Save
                </button>
              </div>
            </div>
          </form>

          <div className="row mt-2">
            <div className="col-md-2">
              <button
                className="btn btn-success btn-lg"
                type="submit"
                onClick={generateCards}
                disabled={loading ? true : false}
              >
                Create Cards
              </button>
            </div>
            <div className="col-md-5">
              <h5>{showAlert && <Alert />}</h5>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddCard;
