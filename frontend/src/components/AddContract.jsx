import { useEffect, useState } from "react";
import { useDataContext } from "../context/data_context";
import { InputRow, ClientAddress, ContactsTable, InputSelect } from ".";
import { useNavigate } from "react-router-dom";

const AddContract = () => {
  const navigate = useNavigate();
  const [same, setSame] = useState(false);
  const [card, setCard] = useState(false);
  const [endDate, setEndDate] = useState(null);
  const {
    contractNo,
    billingFrequency,
    startDate,
    createContract,
    contract,
    sameDetails,
    preferred,
    area,
    specialInstruction,
    contractCreated,
    endContract,
  } = useDataContext();
  const timeList = [
    "10 am - 12 pm",
    "12 pm - 2 pm",
    "2 pm - 4 pm",
    "4 pm - 6 pm",
    "6 pm - 8 pm",
    "Night",
  ];
  const endDateList = [
    "1 Month (30 Days)",
    "2 Months (60 Days)",
    "3 Months (90 Days)",
    "6 Months (180 Days)",
    "1 Year",
  ];
  const lastDate = async (startDate) => {
    const date = new Date(startDate);
    if (endContract && endContract === "1 Year") {
      let ss = await new Date(date.getFullYear() + 1, date.getMonth(), 0);
      return setEndDate(ss)
    } else if (endContract && endContract === "3 Months (90 Days)") {
      let ss = await new Date(date.getFullYear(), date.getMonth() + 3, 0);
      return setEndDate(ss);
    } else if (endContract && endContract === "6 Months (180 Days)") {
      let ss = await new Date(date.getFullYear(), date.getMonth() + 6, 0);
      return setEndDate(ss);
    } else if (
      endContract &&
      (endContract === "1 Month (30 Days)" ||
        endContract === "2 Months (60 Days)")
    ) {
      let ss = await new Date(date.getFullYear(), date.getMonth() + 2, 0);
      return setEndDate(ss);
    }
  };


  useEffect(() => {
    if (startDate) {
      lastDate(startDate);
    }
  }, [startDate, endContract]);

  const { day, time } = preferred;

  const handleSubmit = (e) => {
    e.preventDefault();
    createContract(endDate);
    setCard(true);
  };

  const handleSame = (e) => {
    e.preventDefault();
    sameDetails();
    setSame(true);
  };

  useEffect(() => {
    if (contractCreated) {
      setTimeout(() => {
        navigate(`/addcard/${contract}`);
        setCard(false);
      }, 3000);
    }
    // eslint-disable-next-line
  }, [contractCreated]);

  return (
    <div>
      <form>
        <div className="row">
          <div className="col-md-4">
            <InputRow
              label="Contract Number"
              type="text"
              name="contractNo"
              value={contractNo}
            />
          </div>
          <div className="col-md-4">
            <InputRow
              label="Start Date"
              type="date"
              name="startDate"
              value={startDate}
            />
          </div>
          <div className="col-md-4">
            <InputSelect
              label="End Date:"
              name="endContract"
              value={endContract}
              data={endDateList}
            />
          </div>
          <hr className="mt-3" />
          <div className="col-md-4">
            <InputRow
              label="Day"
              id="preferred"
              type="text"
              name="day"
              value={day}
            />
          </div>
          <div className="col-md-4">
            <InputSelect
              label="Time"
              id="preferred"
              name="time"
              value={time}
              data={timeList}
            />
          </div>
          <div className="col-md-4">
            <InputRow label="Area" type="number" name="area" value={area} />
          </div>
          <hr className="mt-3" />
          <div className="col-md-6">
            <InputRow
              label="Billing Frequency"
              type="text"
              name="billingFrequency"
              value={billingFrequency}
            />
          </div>
          <div className="col-md-6">
            <InputRow
              label="Instructions"
              type="text"
              name="specialInstruction"
              value={specialInstruction}
            />
          </div>
          <hr className="mt-3" />
          <div className="col-md-6 ">
            <h4 className="text-info text-center">Bill To Details:</h4>
            <ClientAddress id="billToAddress" />
            <ContactsTable id="billToContact" />
          </div>
          <div className="col-md-6 ">
            <h4 className="text-info d-inline ms-5">Ship To Details:</h4>
            <button
              onClick={handleSame}
              className="btn btn-primary ms-5 d-inline"
            >
              Same As Billing Details
            </button>
            <ClientAddress id="shipToAddress" same={same} />
            <ContactsTable id="shipToContact" />
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-primary btn-lg"
              type="submit"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddContract;
