import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Alert, InputRow, Loading } from "../components";
import { useDataContext } from "../context/data_context";

const ServiceIntimation = () => {
  const {
    card,
    fetchSingleCard,
    loading,
    serviceDate,
    showAlert,
    displayAlert,
    serviceIntimation,
  } = useDataContext();
  const { id } = useParams();

  useEffect(() => {
    fetchSingleCard(id);
    // eslint-disable-next-line
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    displayAlert();
    serviceIntimation(id);
  };

  if (loading) {
    return <Loading />;
  }

  if (card.length < 1) {
    return (
      <div className="text-center mt-5">
        <h3> No Card Found, Contact Admin.</h3>
        <p>or else update through system.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="my-5">
        {card.map((card) => {
          const { contract, _id, service } = card;
          return (
            <div key={_id}>
              <h4 className="text-center mb-3">{`Contract Number: ${contract.contractNo}`}</h4>
              <h4 className="text-center mb-5">{`Services: ${service}`}</h4>
              <form action="submit">
                {/* <div className="d-flex justify-content-center mt-5 mb-3">
                  <InputRow
                    label="Service Date :"
                    type="date"
                    name="serviceDate"
                    width={200}
                    value={serviceDate}
                  />
                </div> */}
                <div className="text-center">
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Send Service Intimation
                  </button>
                </div>
              </form>
              <div className="col-md-12">{showAlert && <Alert />}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ServiceIntimation;
