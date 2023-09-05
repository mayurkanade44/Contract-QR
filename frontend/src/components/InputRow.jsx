import React from "react";
import { useDataContext } from "../context/data_context";

const InputRow = ({
  label,
  type,
  name,
  value,
  id,
  placeholder,
  width,
  required = true,
}) => {
  const { handleChange } = useDataContext();
  return (
    <div className="row g-3 align-items-center">
      <div className="col-auto ">
        <label className="col-form-label">
          <h4>{label}</h4>
        </label>
      </div>
      <div className="col">
        <input
          className="form-control"
          required={required}
          type={type}
          id={id}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={handleChange}
          style={{ width: width }}
        />
      </div>
    </div>
  );
};

export default InputRow;
