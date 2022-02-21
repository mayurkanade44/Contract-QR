import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ClientDetails, AllCards } from "../components";
import { useDataContext } from "../context/data_context";

const SingleContract = () => {
  

  const { fetchSingleContract, singleContract, deleteContract,} =
    useDataContext();
  const {
    contractNo,
    billToAddress,
    billToContact,
    shipToAddress,
    shipToContact,
    services,
    area,
    preferred,
  } = singleContract;
  const { id } = useParams();

  useEffect(() => {
    fetchSingleContract(id);
    // eslint-disable-next-line
  }, [id]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 my-3">
          <h2 className="text-center">{`Contract Number: ${contractNo}`}</h2>
        </div>
        <div className="col-md-2 my-3">
          <Link to={`/addcard/${id}`}>
            <button className="btn btn-primary">Add Cards</button>
          </Link>
        </div>
        <div className="col-md-2 my-3">
          <Link to="/">
            <button
              onClick={() => deleteContract(id)}
              className="btn btn-danger"
            >
              Delete Contract
            </button>
          </Link>
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
        {services && <AllCards data={services} area={area} preferred={preferred} />}
      </div>
    </div>
  );
};

export default SingleContract;
