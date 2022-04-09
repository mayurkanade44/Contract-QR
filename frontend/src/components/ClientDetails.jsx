import React from "react";

const ClientDetails = ({
  data,
  preferred,
  contacts1,
  contacts2,
  contacts3,
}) => {
  return (
    <div>
      <h5>{`Name: ${data.name}`}</h5>
      <h5>{`Address: ${data.address1}, ${data.city}-${data.pincode}`}</h5>
      <h5>{`Preferred: ${preferred && preferred.day} & ${
        preferred && preferred.time
      }`}</h5>
      <table className="table table-sm table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact No</th>
            <th>Email Id</th>
          </tr>
        </thead>
        <tbody>
          {contacts1 && (
            <tr>
              <td>{contacts1.name}</td>
              <td>{contacts1.contact}</td>
              <td>{contacts1.email}</td>
            </tr>
          )}
          {contacts2 && (
            <tr>
              <td>{contacts2.name}</td>
              <td>{contacts2.contact}</td>
              <td>{contacts2.email}</td>
            </tr>
          )}
          {contacts3 && (
            <tr>
              <td>{contacts3.name}</td>
              <td>{contacts3.contact}</td>
              <td>{contacts3.email}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClientDetails;
