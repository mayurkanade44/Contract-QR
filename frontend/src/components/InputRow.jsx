import React from "react";
import { useDataContext } from "../context/data_context";

const InputRow = ({ label, type, name, value, id }) => {
  const { handleChange } = useDataContext();
  return (
    <div className="row g-3 align-items-center">
      <div className="col-auto ">
        <label className="col-form-label">
          <h4>{label}:-</h4>
        </label>
      </div>
      <div className="col">
        <input
          className="form-control"
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default InputRow;
