import { useEffect, useState } from "react";
import { useDataContext } from "../context/data_context";
import {
  InputRow,
  ClientAddress,
  BillContacts,
  ShipContacts,
  InputSelect,
  Alert,
  BillToAddress,
  ShipToAddress,
} from ".";
import { useNavigate } from "react-router-dom";

const AddContract = () => {
  const navigate = useNavigate();
  const [same, setSame] = useState(false);
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
    sales,
    specialInstruction,
    contractCreated,
    endContract,
    business,
    showAlert,
    loading,
    displayAlert,
    type,
    handleChange,
    adminList,
    allValues,
  } = useDataContext();
  const { day, time } = preferred;

  // const representativeList = [
  //   "PTL",
  //   "RHL",
  //   "PJ",
  //   "BJ",
  //   "LN",
  //   "APR",
  //   "PRI",
  //   "KG",
  //   "GS",
  //   "SD",
  //   "ANT",
  //   "ROY",
  //   "FJQ",
  //   "STQ",
  // ];

  const representativeList = [];
  const businessList = [];
  if (adminList) {
    adminList.map(
      (item) =>
        (item.sales !== undefined && representativeList.push(item.sales)) ||
        (item.business !== undefined && businessList.push(item.business))
    );
  }

  // const businessList = [
  //   "1 RK",
  //   "1 BHK",
  //   "2 BHK",
  //   "3 BHK",
  //   "4 BHK",
  //   "5 BHK",
  //   "Bungalow",
  //   "Gated Community",
  //   "Housing Society",
  //   "Offices",
  //   "Corporate Park",
  //   "Data Center",
  //   "Warehouse",
  //   "Food & Delivery",
  //   "Restaurant",
  //   "Malls",
  //   "Entertainment",
  //   "Shops",
  // ];

  const home = [
    "1 RK",
    "1 BHK",
    "2 BHK",
    "3 BHK",
    "4 BHK",
    "5 BHK",
    "Bungalow",
  ];

  const timeList = [
    "10 am - 12 pm",
    "12 pm - 2 pm",
    "2 pm - 4 pm",
    "4 pm - 6 pm",
    "6 pm - 8 pm",
    "Night",
    "Anytime",
    "To Confirm",
  ];
  const endDateList = [
    "1 Month (30 Days)",
    "2 Months (60 Days)",
    "3 Months (90 Days)",
    "4 Months (120 Days)",
    "5 Months (150 Days)",
    "6 Months (180 Days)",
    "7 Months (210 Days)",
    "8 Months (240 Days)",
    "9 Months (270 Days)",
    "10 Months (300 Days)",
    "11 Months (330 Days)",
    "1 Year",
  ];

  const lastDate = async (startDate) => {
    const date = new Date(startDate);
    if (endContract && endContract === "1 Year") {
      let ss = await new Date(date.getFullYear() + 1, date.getMonth(), 0);
      return setEndDate(ss);
    } else if (endContract && endContract === "3 Months (90 Days)") {
      let ss = await new Date(date.getFullYear(), date.getMonth() + 3, 0);
      return setEndDate(ss);
    } else if (endContract && endContract === "4 Months (120 Days)") {
      let ss = await new Date(date.getFullYear(), date.getMonth() + 4, 0);
      return setEndDate(ss);
    } else if (endContract && endContract === "5 Months (150 Days)") {
      let ss = await new Date(date.getFullYear(), date.getMonth() + 5, 0);
      return setEndDate(ss);
    } else if (endContract && endContract === "6 Months (180 Days)") {
      let ss = await new Date(date.getFullYear(), date.getMonth() + 6, 0);
      return setEndDate(ss);
    } else if (endContract && endContract === "7 Months (210 Days)") {
      let ss = await new Date(date.getFullYear(), date.getMonth() + 7, 0);
      return setEndDate(ss);
    } else if (endContract && endContract === "8 Months (240 Days)") {
      let ss = await new Date(date.getFullYear(), date.getMonth() + 8, 0);
      return setEndDate(ss);
    } else if (endContract && endContract === "9 Months (270 Days)") {
      let ss = await new Date(date.getFullYear(), date.getMonth() + 9, 0);
      return setEndDate(ss);
    } else if (endContract && endContract === "10 Months (300 Days)") {
      let ss = await new Date(date.getFullYear(), date.getMonth() + 10, 0);
      return setEndDate(ss);
    } else if (endContract && endContract === "11 Months (330 Days)") {
      let ss = await new Date(date.getFullYear(), date.getMonth() + 11, 0);
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

  const typeList = ["NC", "RC"];

  useEffect(() => {
    if (startDate) {
      lastDate(startDate);
    }
    // eslint-disable-next-line
  }, [startDate, endContract]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createContract(endDate);
    setSame(false);
    displayAlert();
  };

  const handleSame = (e) => {
    e.preventDefault();
    sameDetails();
    setSame(true);
  };

  useEffect(() => {
    allValues();
    if (contractCreated) {
      setTimeout(() => {
        navigate(`/addcard/${contract}`);
      }, 2000);
    }
    // eslint-disable-next-line
  }, [contractCreated]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4">
            <InputRow
              label="Contract No:"
              type="text"
              id="ContractNumber"
              placeholder="eg: s/124"
              name="contractNo"
              value={contractNo}
            />
          </div>
          <div className="col-md-1">
            <select
              className="form-select"
              style={{ marginTop: 6 }}
              aria-label="Default select example"
              name="type"
              value={type}
              onChange={handleChange}
            >
              {typeList.map((data) => {
                return (
                  <option value={data} key={data}>
                    {data}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-md-6">
            <InputSelect
              label="Sales Person :"
              name="sales"
              value={sales}
              data={representativeList}
              width={150}
            />
          </div>
          <hr className="mt-3" />
          <div className="col-md-4">
            <InputRow
              label="Start Date :"
              type="date"
              name="startDate"
              value={startDate}
            />
          </div>
          <div className="col-md-5">
            <InputSelect
              label="End Date :"
              name="endContract"
              value={endContract}
              data={endDateList}
              width={180}
            />
          </div>
          <hr className="mt-3" />
          <div className="col-md-4">
            <InputSelect
              label="Business"
              name="business"
              value={business}
              data={businessList}
            />
          </div>
          <div className="col-md-4">
            <InputRow
              label="Preferred Day:"
              id="preferred"
              type="text"
              name="day"
              value={day}
            />
          </div>
          <div className="col-md-4">
            <InputSelect
              label="&amp; Time :"
              id="preferred"
              name="time"
              value={time}
              data={timeList}
            />
          </div>
          <hr className="mt-3" />
          {!home.includes(business) && (
            <div className="col-md-2">
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
            <InputRow
              label="Billing Frequency :"
              type="text"
              name="billingFrequency"
              value={billingFrequency}
            />
          </div>
          <div className="col-md-5">
            <InputRow
              label="Instructions :"
              type="text"
              name="specialInstruction"
              value={specialInstruction}
              placeholder="should be comma separated"
            />
          </div>
          <hr className="mt-3" />
          <div className="col-md-6 ">
            <h4 className="text-info text-center mb-3">Bill To Details:</h4>
            <BillToAddress id="billToAddress" />
            <BillContacts />
          </div>
          <div className="col-md-6 ">
            <h4 className="text-info d-inline ms-5">Ship To Details:</h4>
            <button
              onClick={handleSame}
              className="btn btn-primary btn-sm ms-5 d-inline"
            >
              Same As Billing Details
            </button>
            <ShipToAddress id="shipToAddress" />
            <ShipContacts same={same} />
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-primary btn-lg"
              type="submit"
              disabled={loading ? true : false}
            >
              Save
            </button>
          </div>
          <div className="col-md-4">{showAlert && <Alert />}</div>
        </div>
      </form>
    </div>
  );
};

export default AddContract;
