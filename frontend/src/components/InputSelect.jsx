import React from "react";
import { useDataContext } from "../context/data_context";

const InputSelect = ({ label, data, name, value, id, width, w }) => {
  const { handleChange } = useDataContext();
  return (
    <div className="row mt-2">
      <div className={w ? "col-md-5" : "col-md-4"}>
        <h4>{label}</h4>
      </div>
      <div className="col-md-7">
        <select
          className="form-select"
          aria-label="Default select example"
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          style={{ width: width }}
        >
          {data.map((data) => {
            return (
              <option value={data} key={data}>
                {data}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default InputSelect;
