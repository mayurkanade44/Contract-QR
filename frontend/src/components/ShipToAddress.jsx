import { InputRow } from ".";
import { useDataContext } from "../context/data_context";

const ShipToAddress = ({ id }) => {
  const { shipToAddress, handleChange } = useDataContext();
  const prefixList = ["Mr", "Mrs", "Ms", "M/s", "Other"];
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
  } = shipToAddress;
  return (
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
      <InputRow label="City :" id={id} type="text" name="city" value={city} />
      <InputRow
        label="Pincode :"
        id={id}
        type="number"
        name="pincode"
        value={pincode}
      />
    </div>
  );
};

export default ShipToAddress;
