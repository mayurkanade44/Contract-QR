import React from "react";

const ClientDetails = ({ data, contacts }) => {
  return (
    <div>
      {data.map((data) => {
        return (
          <div key={data._id}>
            <h5>{`Name: ${data.name}`}</h5>
            <h5>{`Address: ${data.address} ${data.nearBy} ${data.pincode}`}</h5>
          </div>
        );
      })}
      <h5>Contact Details:-</h5>
      <table className="table table-sm table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact No</th>
            <th>Email Id</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => {
            return (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.contact}</td>
                <td>{contact.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ClientDetails;
