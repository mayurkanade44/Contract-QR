import { useEffect } from "react";
import { useDataContext } from "../context/data_context";
import { InputRow, InputSelect } from ".";
import { useParams } from "react-router-dom";
import moment from "moment";

const AddCard = () => {
  const {
    frequency,
    frequencyList,
    service,
    area,
    preferred,
    specialInstruction,
    fetchSingleContract,
    singleContract,
  } = useDataContext();
  const { day, time } = preferred;
  const { contractNo, startDate, endDate } = singleContract;
  const timeList = [
    "10 am - 12 pm",
    "12 pm - 2 pm",
    "2 pm - 4 pm",
    "4 pm - 6 pm",
    "6 pm - 8 pm",
    "Night",
  ];

  const { id } = useParams();

  useEffect(() => {
    fetchSingleContract(id);
  }, [id]);
  console.log(singleContract);

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
            <InputRow label="Area" type="number" name="area" value={area} />
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                <h4 className="text-center">Preferred</h4>
              </div>
              <div className="col-md-6">
                <InputRow
                  label="Day"
                  id="preferred"
                  type="text"
                  name="day"
                  value={day}
                />
              </div>
              <div className="col-md-6">
                <InputSelect
                  label="Time"
                  id="preferred"
                  name="time"
                  value={time}
                  data={timeList}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-5">
            <InputRow
              label="Instructions"
              type="text"
              name="specialInstruction"
              value={specialInstruction}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCard;
