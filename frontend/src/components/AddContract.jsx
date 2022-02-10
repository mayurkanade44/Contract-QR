import { useEffect } from "react";
import { useDataContext } from "../context/data_context";
import { InputRow, ClientAddress, ContactsTable } from ".";
import { useNavigate } from "react-router-dom";

const AddContract = () => {
  const navigate = useNavigate();
  const {
    contractNo,
    billingFrequency,
    startDate,
    createContract,
    contractCreated,
    numberOfCards,
  } = useDataContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    createContract();
  };

  useEffect(() => {
    if (contractCreated) {
      setTimeout(() => {
        navigate("/create");
      }, 3000);
    }
  }, [contractCreated, navigate]);

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
          <div className="col-md-6 ">
            <h4 className="text-info text-center">Bill To Details:</h4>
            <ClientAddress id="billToAddress" />
            <ContactsTable />
          </div>
          <div className="col-md-6 ">
            <h4 className="text-info text-center">Ship To Details:</h4>
            <ClientAddress id="shipToAddress" />
            <ContactsTable />
          </div>
          <div className="col-md-4">
            <InputRow
              label="Number Of Cards"
              type="number"
              name="numberOfCards"
              value={numberOfCards}
            />
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-primary btn-lg"
              type="submit"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddContract;
