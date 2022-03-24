import { useEffect, useState } from "react";
import { useDataContext } from "../context/data_context";
import { InputSelect, Alert, Loading } from ".";
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
  } = useDataContext();

  const { contractNo, startDate, endDate, services } = singleContract;

  const frequencyList = [
    "Daily",
    "Single",
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
  ];

  const serviceList = [
    { label: "Green Shield - Flat", value: "Green Shield - Flat" },
    { label: "Green Shield - CA", value: "Green Shield - CA" },
    { label: "Termiproof - CS", value: "Termiproof - CS" },
    { label: "Termiproof - DISP", value: "Termiproof - DISP" },
    { label: "Ratrid", value: "Ratrid,R B Place,W T Place" },
    { label: "Bugfree", value: "Bugfree" },
    { label: "Flyban", value: "Flyban" },
    { label: "Mosquit - CA", value: "Mosquit - CA" },
    { label: "Woodsafe", value: "Woodsafe" },
    { label: "FX1", value: "FX1" },
    {
      label: "Civil Work",
      value:
        "Civil Work,Drilling Injecting & Spraying Process,*Wall Spray,*Ceiling Spray,*Floor Spray",
    },
    { label: "Interior", value: "Interior, *Wood Work" },
    {
      label: "Civil & Interior",
      value:
        "Civil & Interior Wood Work,Drilling Injecting & Spraying Process,*Wall Spray,*Ceiling Spray,*Wood Work,*Floor Spray",
    },
    { label: "Thermal Fogging", value: "Thermal Fogging" },
    { label: "Cold Fogging", value: "Cold Fogging" },
    { label: "Chemical Spray", value: "Chemical Spray" },
    { label: "Larvicidal", value: "Larvicidal" },
    { label: "Others", value: "Others" },
  ];

  const addChemicals = () => {
    const temp = [];
    if (value.includes("Green Shield - Flat")) {
      temp.push("GEL          ODL          OB          MORT          ROCX");
    }
    if (value.includes("Green Shield - CA")) {
      temp.push("E3          PB          HOOK");
    }
    if (value.includes("Termiproof - CS")) {
      temp.push("WBTM          WBPR          OBTM          TM           IMD");
    }
    if (value.includes("Termiproof - DISP") || value.includes("Civil Work")) {
      temp.push("WBTM          TM           IMD");
    }
    if (value.includes("Ratrid")) {
      temp.push("BAIT-Z BAIT-R TRAY CAKE GRAIN GPS GBB PNC PSB");
    }
    if (value.includes("Bugfree")) {
      temp.push("WBBB          OBBB");
    }
    if (value.includes("Woodsafe")) {
      temp.push("WAX          TM");
    }
    if (value.includes("Flyban")) {
      temp.push("FLYCO          OD          E3");
    }
    if (value.includes("Mosquit - CA")) {
      temp.push("PB          OD          E3          HOOK          POW");
    }
    if (value.includes("Thermal Fogging")) {
      temp.push("MF");
    }
    if (value.includes("Chemical Spray")) {
      temp.push("E3          OD");
    }
    if (value.includes("Larvicidal")) {
      temp.push("LAVA          PYRO");
    }
    if (value.includes("Cold Fogging")) {
      temp.push("ULV");
    }
    if (value.includes("Interior") || value.includes("Civil & Interior")) {
      temp.push("WBTM          OBTM          TM          IMD");
    }
    if (value.includes("Others") || value.includes("FX1")) {
      temp.push(" ");
    }
    return setChemicals(temp);
  };

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
      }
      if (frequency && frequency === "Quarterly" && index % 3 === 0) {
        return due.push(date);
      }
      if (frequency && frequency === "Single" && index === 0) {
        return due.push(date);
      }
      if (frequency && frequency === "Twice A Year" && index % 6 === 0) {
        return due.push(date);
      }
      if (frequency && frequency === "Alternate Monthly" && index % 2 === 0) {
        return due.push(date);
      }
      if (
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

    // eslint-disable-next-line
  }, [id, add]);

  useEffect(() => {
    if ((startDate, endDate)) {
      dueRange(startDate, endDate);
    }
    // eslint-disable-next-line
  }, [startDate, frequency]);

  useEffect(() => {
    addChemicals();
    // eslint-disable-next-line
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createCard(dueMonths, value, chemicals);
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
            </tr>
          </thead>
          <tbody>
            {services &&
              services.map((data, index) => {
                const { frequency, service } = data;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{`${service},`}</td>
                    <td>{frequency}</td>
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
                    style={{ height: 120 }}
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
