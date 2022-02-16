import React from "react";
import { InputRow } from ".";
import { useDataContext } from "../context/data_context";

const ClientAddress = ({ id, same }) => {
  const { name, address1, address2, address3, address4, nearBy, city, pincode } = "";
  const { shipToAddress } = useDataContext();
  return (
    <>
      {same && shipToAddress ? (
        <div>
          <InputRow
            label="Name"
            id={id}
            placeholder="Full Name"
            type="text"
            name="name"
            value={shipToAddress.name}
          />
          <InputRow
            label="Address1"
            id={id}
            type="text"
            name="address1"
            placeholder="Building/Office Name"
            value={shipToAddress.address1}
          />
          <InputRow
            label="Address2"
            id={id}
            type="text"
            placeholder="Flat/Office No"
            name="address2"
            value={shipToAddress.address2}
          />
          <InputRow
            label="Address3"
            id={id}
            type="text"
            placeholder="Road/Lane Name"
            name="address3"
            value={shipToAddress.address3}
          />
          <InputRow
            label="Address4"
            id={id}
            type="text"
            placeholder="Location"
            name="address4"
            value={shipToAddress.address4}
          />
          <InputRow
            label="Near By"
            id={id}
            type="text"
            placeholder="Landmark"
            name="nearBy"
            value={shipToAddress.nearBy}
          />
          <InputRow
            label="City"
            id={id}
            type="text"
            name="city"
            value={shipToAddress.city}
          />
          <InputRow
            label="Pincode"
            id={id}
            type="number"
            name="pincode"
            value={shipToAddress.pincode}
          />
        </div>
      ) : (
        <div>
          <div className="input-group mb-3">
            <h4>Name:-</h4>
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Mr
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item">Ms</a>
              </li>
            </ul>
            <input
              type="text"
              className="form-control"
              aria-label="Text input with dropdown button"
            />
          </div>
          <InputRow
            label="Address1"
            id={id}
            type="text"
            name="address1"
            placeholder="Building/Office Name"
            value={address1}
          />
          <InputRow
            label="Address2"
            id={id}
            type="text"
            placeholder="Flat/Office No"
            name="address2"
            value={address2}
          />
          <InputRow
            label="Address3"
            id={id}
            type="text"
            placeholder="Road/Lane Name"
            name="address3"
            value={address3}
          />
          <InputRow
            label="Address4"
            id={id}
            type="text"
            placeholder="Location"
            name="address4"
            value={address4}
          />
          <InputRow
            label="Near By"
            id={id}
            type="text"
            placeholder="Landmark"
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
        </div>
      )}
    </>
  );
};

export default ClientAddress;
