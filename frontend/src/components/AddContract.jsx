import React from "react";
import { useDataContext } from "../context/data_context";
import { InputRow } from "../components";

const AddContract = () => {
  const {
    contractNo,
    billingFrequency,
    billToAddress: { name, address, nearBy, city, pincode },
  } = useDataContext();

  return (
    <div>
      <form>
        <div className="row">
          <div className="col-md-7 my-3">
            <InputRow
              label="Contract Number"
              type="text"
              name="contractNo"
              value={contractNo}
            />
          </div>
          <h4>Bill To Details:</h4>
          <div className="col-md-6 my-3">
            <InputRow
              label="Name"
              id="billToAddress"
              type="text"
              name="name"
              value={name}
            />
            <InputRow
              label="Address"
              id="billToAddress"
              type="text"
              name="address"
              value={address}
            />
            <InputRow
              label="Near By"
              id="billToAddress"
              type="text"
              name="nearBy"
              value={nearBy}
            />
            <InputRow
              label="City"
              id="billToAddress"
              type="text"
              name="city"
              value={city}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddContract;
