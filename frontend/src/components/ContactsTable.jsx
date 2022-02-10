import React from "react";
import { useDataContext } from "../context/data_context";

const ContactsTable = () => {
    const {
      temp1name,
      temp2name,
      temp3name,
      temp1contact,
      temp2contact,
      temp3contact,
      temp1email,
      temp2email,
      temp3email,
    } = "";
   const {handleChange}= useDataContext()
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th className="col-md-4 text-center">Name</th>
            <th className="col-md-4 text-center">Contact Number</th>
            <th className="col-md-4 text-center">Email Id</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="text" name="temp1name" value={temp1name} />
            </td>
            <td>
              <input type="text" />
            </td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td>
              <input type="text" name="temp" />
            </td>
            <td>
              <input type="text" />
            </td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td>
              <input type="text" name="temp" />
            </td>
            <td>
              <input type="text" />
            </td>
            <td>
              <input type="text" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ContactsTable;
