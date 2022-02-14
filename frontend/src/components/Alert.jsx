import React from "react";
import { useDataContext } from "../context/data_context";

const Alert = () => {
  const {alertType, alertText} = useDataContext()
  return (
    <div>
      <div className={`alert alert-${alertType}`} role="alert">
        {alertText}
      </div>
    </div>
  );
};

export default Alert;
