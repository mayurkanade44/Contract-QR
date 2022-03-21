import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ClientDetails, AllCards, Loading, Alert } from "../components";
import { useDataContext } from "../context/data_context";
import { useNavigate } from "react-router-dom";

const SingleContract = () => {
  const {
    fetchSingleContract,
    singleContract,
    deleteContract,
    loading,
    role,
    showAlert,
    displayAlert,
    del,
  } = useDataContext();
  const navigate = useNavigate();
  const {
    contractNo,
    billToAddress,
    billToContact1,
    billToContact2,
    billToContact3,
    shipToAddress,
    shipToContact1,
    shipToContact2,
    shipToContact3,
    services,
    area,
    preferred,
  } = singleContract;
  const { id } = useParams();

  useEffect(() => {
    fetchSingleContract(id);

    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (del) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
    // eslint-disable-next-line
  }, [del]);

  const deleteCont = (e) => {
    e.preventDefault();
    deleteContract(id);
    displayAlert();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <h5 className="text-center">{showAlert && <Alert />}</h5>
      <div className="row">
        <div className="col-md-6 my-3">
          <h2 className="text-center">{`Contract Number: ${contractNo}`}</h2>
        </div>
        <div className="col-md-2 my-3">
          <Link to={`/addcard/${id}`}>
            {(role === "Sales" || role === "Admin") && (
              <button className="btn btn-primary">Add Cards</button>
            )}
          </Link>
        </div>
        {role === "Admin" && (
          <div className="col-md-2 my-3">
            <button onClick={deleteCont} className="btn btn-danger">
              Delete Contract
            </button>
          </div>
        )}
        <div className="col-md-6">
          <h2 className="text-center mb-4">Bill To Details</h2>
          {billToAddress && (
            <ClientDetails
              data={billToAddress}
              contacts1={billToContact1}
              contacts2={billToContact2}
              contacts3={billToContact3}
            />
          )}
        </div>
        <div className="col-md-6">
          <h2 className="text-center mb-4">Ship To Details</h2>
          {shipToAddress && (
            <ClientDetails
              data={shipToAddress}
              contacts1={shipToContact1}
              contacts2={shipToContact2}
              contacts3={shipToContact3}
            />
          )}
        </div>
        <h2 className="text-center">Service Cards</h2>
        {services && (
          <AllCards
            data={services}
            area={area}
            preferred={preferred}
            role={role}
            contractNo={contractNo}
          />
        )}
      </div>
    </div>
  );
};

export default SingleContract;
