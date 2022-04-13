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
    sendEmail,
  } = useDataContext();

  const { contractNo, startDate, endDate, services, type } = singleContract;

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
    "3 Services Once In 4 Months",
    "2 Services Once In 6 Months",
    "As An When Called",
    "Multi Frequency",
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

  const home = [
    "1 RK",
    "1 BHK",
    "2 BHK",
    "3 BHK",
    "4 BHK",
    "5 BHK",
    "Bungalow",
  ];

  // const serviceList = [
  //   { label: "Green Shield", value: "Green Shield" },
  //   { label: "Green Shield - CA", value: "Green Shield - CA" },
  //   { label: "Termiproof - CS", value: "Termiproof - CS" },
  //   { label: "Termiproof - DISP", value: "Termiproof - DISP" },
  //   {
  //     label: "Post Construction Termite",
  //     value: "Post Construction Anti Termite Treatment",
  //   },
  //   { label: "Rat Rid", value: "Rat Rid, , ,R B Place,W T Place" },
  //   { label: "Bugfree", value: "Bugfree" },
  //   { label: "Flyban", value: "Flyban" },
  //   { label: "Woodsafe", value: "Woodsafe" },
  //   { label: "Antron", value: "Antron" },
  //   { label: "Rapron", value: "Rapron" },
  //   { label: "FX1", value: "FX1" },
  //   {
  //     label: "Civil Work",
  //     value:
  //       "Civil Work,Drilling Injecting & Spraying Process,*Wall Spray,*Ceiling Spray,*Floor Spray",
  //   },
  //   { label: "Interior", value: "Interior, *Wood Work" },
  //   {
  //     label: "Civil & Interior",
  //     value:
  //       "Civil & Interior Wood Work,Drilling Injecting & Spraying Process,*Wall Spray,*Ceiling Spray,*Floor Spray,*Wood Work",
  //   },
  //   { label: "Mosquit - Thermal Fogging", value: "Mosquit - Thermal Fogging" },
  //   { label: "Mosquit - Cold Fogging", value: "Mosquit - Cold Fogging" },
  //   { label: "Mosquit - Chemical Spray", value: "Mosquit - Chemical Spray" },
  //   {
  //     label: "Mosquit - Chemical Spray(ULV)",
  //     value: "Mosquit - Chemical Spray(ULV)",
  //   },
  //   {
  //     label: "Mosquit - Larvicidal Spray",
  //     value: "Mosquit - Larvicidal Spray",
  //   },
  //   { label: "Mosquit - CA", value: "Mosquit - CA" },
  //   { label: "Others", value: "Others" },
  // ];

  const addChemicals = () => {
    const temp = [];
    const value1 = value.split(",");

    value1.forEach((item) => {
      serviceChemicalsList.forEach((item1) => {
        return item1.label === item && temp.push(item1.chemical);
      });
    });
    // serviceChemicalsList.map(
    //   (item) => value.includes(item.value) && temp.push(item.chemical)
    // );

    // if (value.includes("Green Shield")) {
    //   temp.push("GEL          ODL          OB          MORT          ROCX");
    // }
    // if (value.includes("Green Shield - CA")) {
    //   temp.push("E3          PB          HOOK");
    // }
    // if (value.includes("Termiproof - CS")) {
    //   temp.push("WBTM          WBPR          OBTM          TM           IMD");
    // }
    // if (value.includes("Post Construction Anti Termite Treatment")) {
    //   temp.push("WBTM");
    // }
    // if (value.includes("Termiproof - DISP") || value.includes("Civil Work")) {
    //   temp.push("WBTM          TM           IMD");
    // }
    // if (value.includes("Rat Rid")) {
    //   temp.push("BAIT-Z BAIT-R TRAY CAKE GRAIN GPS GBB PNC PSB");
    // }
    // if (value.includes("Bugfree")) {
    //   temp.push("WBBB          OBBB");
    // }
    // if (value.includes("Rapron")) {
    //   temp.push("CBA");
    // }
    // if (value.includes("Woodsafe")) {
    //   temp.push("WAX          TM");
    // }
    // if (value.includes("Flyban")) {
    //   temp.push("FLYCO          OD          E3");
    // }
    // if (value.includes("Mosquit - CA")) {
    //   temp.push("PB          OD          E3          HOOK          POW");
    // }
    // if (value.includes("Mosquit - Thermal Fogging")) {
    //   temp.push("MF");
    // }
    // if (
    //   value.includes("Mosquit - Chemical Spray") ||
    //   value.includes("Mosquit - Chemical Spray(ULV)")
    // ) {
    //   temp.push("E3          OD");
    // }
    // if (value.includes("Mosquit - Larvicidal Spray")) {
    //   temp.push("LAVA          PYRO");
    // }
    // if (value.includes("Antron")) {
    //   temp.push("TM          OD          AC");
    // }
    // if (value.includes("Mosquit - Cold Fogging")) {
    //   temp.push("ULV");
    // }
    // if (value.includes("Interior") || value.includes("Civil & Interior")) {
    //   temp.push("WBTM          OBTM          TM          IMD");
    // }
    // if (value.includes("Others") || value.includes("FX1")) {
    //   temp.push(" ");
    // }
    return setChemicals(temp);
  };

  const { id } = useParams();

  const dueRange = (startDate, endDate) => {
    const startMonth = startDate.split("T")[0];
    const endMonth = endDate.split("T")[0];

    var start = moment(startMonth);
    var end = moment(endMonth);

    var months = [start.format("MMM YY")];
    end.subtract(1, "month"); //Substract one month to exclude endDate itself

    var month = moment(start); //clone the startDate
    while (month < end) {
      month.add(1, "month");
      months.push(month.format("MMM YY"));
    }
    const due = [];
    months.forEach((date, index) => {
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
          frequency === "As An When Called" ||
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
    allValues();
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
              <div className="col-md-5"></div>

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
                        options={serviceChemicalsList}
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
            <div className="col-md-2">
              <button className="btn btn-info" onClick={sendEmail} disabled>
                Send Email
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
