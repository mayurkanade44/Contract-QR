import React from "react";
import { InputRow, InputSelect } from ".";
import { useDataContext } from "../context/data_context";

const ClientAddress = ({ id, same }) => {
  const {
    prefix,
    name,
    address1,
    address2,
    address3,
    address4,
    nearBy,
    city,
    pincode,
  } = "";
  const { shipToAddress, handleChange } = useDataContext();
  const prefixList = ["Mr", "Mrs", "Ms", "Other"];
  return (
    <>
      {same && shipToAddress ? (
        <div>
          <div className="row">
            <div className="col-md-4">
              <InputSelect
                label="Name"
                id={id}
                name="prefix"
                type="text"
                value={shipToAddress.prefix}
                data={prefixList}
              />
            </div>
            <div className="col-md-8 mt-2">
              <InputRow
                id={id}
                placeholder="Full Name"
                type="text"
                name="name"
                value={shipToAddress.name}
              />
            </div>
          </div>
          <InputRow
            label="Address1 :"
            id={id}
            type="text"
            name="address1"
            placeholder="Building/Office Name"
            value={shipToAddress.address1}
          />
          <InputRow
            label="Address2 :"
            id={id}
            type="text"
            placeholder="Flat/Office No"
            name="address2"
            value={shipToAddress.address2}
          />
          <InputRow
            label="Address3 :"
            id={id}
            type="text"
            placeholder="Road/Lane Name"
            name="address3"
            value={shipToAddress.address3}
          />
          <InputRow
            label="Address4 :"
            id={id}
            type="text"
            placeholder="Location"
            name="address4"
            value={shipToAddress.address4}
          />
          <InputRow
            label="Near By :"
            id={id}
            type="text"
            placeholder="Landmark"
            name="nearBy"
            value={shipToAddress.nearBy}
          />
          <InputRow
            label="City :"
            id={id}
            type="text"
            name="city"
            value={shipToAddress.city}
          />
          <InputRow
            label="Pincode :"
            id={id}
            type="number"
            name="pincode"
            value={shipToAddress.pincode}
          />
        </div>
      ) : (
        <div>
          <div className="row my-2">
            <div className="col-md-2">
              <label>
                <h4>Name</h4>
              </label>
            </div>
            <div className="col-md-2">
              <select
                className="form-select"
                aria-label="Default select example"
                id={id}
                name="prefix"
                value={prefix}
                onChange={handleChange}
              >
                {prefixList.map((data) => {
                  return (
                    <option value={data} key={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col">
              <input
                className="form-control"
                type="text"
                placeholder="Full Name"
                id={id}
                name="name"
                value={name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <InputRow
            label="Address1 :"
            id={id}
            type="text"
            name="address1"
            placeholder="Building/Office Name"
            value={address1}
          />
          <InputRow
            label="Address2 :"
            id={id}
            type="text"
            placeholder="Flat/Office No"
            name="address2"
            value={address2}
          />
          <InputRow
            label="Address3 :"
            id={id}
            type="text"
            placeholder="Road/Lane Name"
            name="address3"
            value={address3}
          />
          <InputRow
            label="Address4 :"
            id={id}
            type="text"
            placeholder="Location"
            name="address4"
            value={address4}
          />
          <InputRow
            label="Near By :"
            id={id}
            type="text"
            placeholder="Landmark"
            name="nearBy"
            value={nearBy}
          />
          <InputRow
            label="City :"
            id={id}
            type="text"
            name="city"
            value={city}
          />
          <InputRow
            label="Pincode :"
            id={id}
            type="number"
            name="pincode"
            value={pincode}
          />
        </div>
      )}
    </>
  );
};

export default ClientAddress;
