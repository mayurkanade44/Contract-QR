import React from "react";
import { useDataContext } from "../context/data_context";
import { InputRow, ClientAddress } from ".";

const AddContract = () => {
  const { contractNo, billingFrequency, startDate, createContract } =
    useDataContext();
  const { name, email, contact } = "";

  const handleSubmit = (e) => {
    e.preventDefault();
    createContract();
  };

  return (
    <div>
      <form>
        <div className="row">
          <div className="col-md-4 my-3">
            <InputRow
              label="Contract Number"
              type="text"
              name="contractNo"
              value={contractNo}
            />
          </div>
          <div className="col-md-4 my-3">
            <InputRow
              label="Start Date"
              type="date"
              name="startDate"
              value={startDate}
            />
          </div>
          <div className="col-md-4 my-3">
            <InputRow
              label="Billing"
              type="text"
              name="billingFrequency"
              value={billingFrequency}
            />
          </div>
          <hr />
          <h4 className="text-info">Bill To Details:</h4>
          <div className="col-md-12 my-3">
            <ClientAddress id="billToAddress" />
          </div>
          <hr />
          <h4 className="text-info">Ship To Details:</h4>
          <div className="col-md-12 my-3">
            <ClientAddress id="shipToAddress" />
          </div>
          <hr />
          <h4>Bill To Contacts</h4>
          <div className="col-md-3">
            <InputRow
              label="Name"
              id="billToContact"
              type="text"
              name="name"
              value={name}
            />
          </div>
          <div className="col-md-4">
            <InputRow
              label="Contact No"
              type="text"
              id="billToContact"
              name="contact"
              value={contact}
            />
          </div>
          <div className="col-md-4">
            <InputRow
              label="Email Id"
              type="text"
              id="billToContact"
              name="email"
              value={email}
            />
          </div>
          <div className="col-md-3">
            <InputRow
              label="Name"
              id="billToContact"
              type="text"
              name="name"
              value={name}
            />
          </div>
          <div className="col-md-4">
            <InputRow
              label="Contact No"
              type="text"
              id="billToContact"
              name="contact"
              value={contact}
            />
          </div>
          <div className="col-md-4">
            <InputRow
              label="Email Id"
              type="text"
              id="billToContact"
              name="email"
              value={email}
            />
          </div>
          <div className="col-md-1 align-items-center">
            <button className="btn btn-primary">Add</button>
          </div>
          <h4>Ship To Contacts</h4>
          <div className="col-md-3">
            <InputRow
              label="Name"
              id="shipToContact"
              type="text"
              name="name"
              value={name}
            />
          </div>
          <div className="col-md-4">
            <InputRow
              label="Contact No"
              type="text"
              id="shipToContact"
              name="contact"
              value={contact}
            />
          </div>
          <div className="col-md-4">
            <InputRow
              label="Email Id"
              type="text"
              id="shipToContact"
              name="email"
              value={email}
            />
          </div>
          {/* <div className="col-md-1 align-items-center">
            <button className="btn btn-primary">Add</button>
          </div> */}
          <button
            className="btn btn-primary my-3"
            type="submit"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContract;
