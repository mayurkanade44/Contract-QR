import React from "react";
import { InputRow } from ".";

const ClientAddress = ({ id }) => {
  const { name, address, nearBy, city, pincode } = "";
  return (
    <div className="row">
      <div className="col-md-5">
        <InputRow label="Name" id={id} type="text" name="name" value={name} />
      </div>
      <div className="col-md-7">
        <InputRow
          label="Address"
          id={id}
          type="text"
          name="address"
          value={address}
        />
      </div>
      <div className="col-md-4">
        <InputRow
          label="Near By"
          id={id}
          type="text"
          name="nearBy"
          value={nearBy}
        />
      </div>
      <div className="col-md-4">
        <InputRow label="City" id={id} type="text" name="city" value={city} />
      </div>
      <div className="col-md-4">
        <InputRow
          label="Pincode"
          id={id}
          type="number"
          name="pincode"
          value={pincode}
        />
      </div>
    </div>
  );
};

export default ClientAddress;
