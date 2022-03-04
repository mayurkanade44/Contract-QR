import { useEffect, useState } from "react";
import { useDataContext } from "../context/data_context";
import { InputRow, InputSelect } from ".";
import { useParams } from "react-router-dom";
import moment from "moment";

const AddCard = () => {
  const [dueMonths, setDueMonths] = useState([]);
  const [add, setAdd] = useState(true);
  const {
    frequency,
    frequencyList,
    service,
    fetchSingleContract,
    singleContract,
    createCard,
    createCards,
    treatmentLocation,
    handleChange,
  } = useDataContext();

  const { contractNo, startDate, endDate, services } = singleContract;

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
    createCard(dueMonths);
    setAdd(!add);
  };

  const generateCards = (e) => {
    e.preventDefault();
    createCards(id);
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
                <th>Services</th>
                <th>Frequency</th>
              </tr>
            </thead>
            <tbody>
              {services &&
                services.map((data, index) => {
                  const { frequency, service } = data;
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{`${service}`}</td>
                      <td>{frequency}</td>
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
            <InputRow
              label="Services"
              type="text"
              placeholder="separate by comma"
              name="service"
              value={service}
            />
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
      <div className="col-md-4">
        <button className="btn btn-dark" type="submit" onClick={generateCards}>
          Create Cards
        </button>
      </div>
    </div>
  );
};

export default AddCard;
