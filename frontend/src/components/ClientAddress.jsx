import React from "react";
import { InputRow } from ".";

const ClientAddress = ({ id }) => {
  const { name, address1, address2, address3, nearBy, city, pincode } = "";
  return (
    <>
      <InputRow label="Name" id={id} type="text" name="name" value={name} />
      <InputRow
        label="Address1"
        id={id}
        type="text"
        name="address1"
        value={address1}
      />
      <InputRow
        label="Address2"
        id={id}
        type="text"
        name="address2"
        value={address2}
      />
      <InputRow
        label="Address3"
        id={id}
        type="text"
        name="address3"
        value={address3}
      />
      <InputRow
        label="Near By"
        id={id}
        type="text"
        name="nearBy"
        value={nearBy}
      />
      <InputRow label="City" id={id} type="text" name="city" value={city} />
      <InputRow
        label="Pincode"
        id={id}
        type="number"
        name="pincode"
        value={pincode}
      />
    </>
  );
};

export default ClientAddress;
