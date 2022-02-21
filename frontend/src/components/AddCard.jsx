import { useEffect, useState } from "react";
import { useDataContext } from "../context/data_context";
import { InputRow, InputSelect } from ".";
import { useParams } from "react-router-dom";
import moment from "moment";

const AddCard = () => {
  const [dueMonths, setDueMonths] = useState([]);
  const {
    frequency,
    frequencyList,
    service,
    specialInstruction,
    fetchSingleContract,
    singleContract,
    createCard,
    createCards,
  } = useDataContext();

  const { contractNo, startDate, endDate } = singleContract;

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
    months.map((date, index) => {
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
  }, [id, startDate, frequency]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createCard(dueMonths);
  };

  const generateCards = (e) => {
    e.preventDefault();
    createCards(id);
  };

  return (
    <div className="container my-3">
      <form>
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
          <div className="col-md-4">
            <InputSelect
              label="Frequency"
              name="frequency"
              value={frequency}
              data={frequencyList}
            />
          </div>
          <div className="col-md-4">
            <InputRow
              label="Services"
              type="text"
              name="service"
              value={service}
            />
          </div>
          <div className="col-md-4">
            <button
              className="btn btn-dark"
              type="submit"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
          <div className="col-md-4">
            <button
              className="btn btn-dark"
              type="submit"
              onClick={generateCards}
            >
              Create Cards
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCard;
