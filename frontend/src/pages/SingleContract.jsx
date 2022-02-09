import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ClientDetails, AllCards } from "../components";
import { useDataContext } from "../context/data_context";


const SingleContract = () => {
  const { fetchSingleContract, singleContract } = useDataContext();
  const {
    contractNo,
    billToAddress,
    billToContact,
    shipToAddress,
    shipToContact,
    services,
  } = singleContract;
  const { id } = useParams();

  useEffect(() => {
    fetchSingleContract(id);
  }, [id]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 my-3">
          <h2 className="text-center">{`Contract Number: ${contractNo}`}</h2>
        </div>
        <div className="col-md-6">
          <h2 className="text-center mb-4">Bill To Details</h2>
          {billToAddress && (
            <ClientDetails data={billToAddress} contacts={billToContact} />
          )}
        </div>
        <div className="col-md-6">
          <h2 className="text-center mb-4">Ship To Details</h2>
          {shipToAddress && (
            <ClientDetails data={shipToAddress} contacts={shipToContact} />
          )}
        </div>
        <h2 className="text-center">Service Cards</h2>
        {services && <AllCards data={services} />}
      </div>
    </div>
  );
};

export default SingleContract;
