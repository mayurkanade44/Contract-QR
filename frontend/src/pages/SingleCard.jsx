import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { UpdateCard, Loading } from "../components";
import { useDataContext } from "../context/data_context";

const SingleCard = () => {
  const { card, fetchSingleCard, loading } = useDataContext();
  const { id } = useParams();

  useEffect(() => {
    fetchSingleCard(id);
    // eslint-disable-next-line
  }, [id]);

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
              <h2 className="text-center">{`Contract Number: ${contract.contractNo}`}</h2>
              <h2 className="text-center">{`Services: ${service}`}</h2>
            </div>
          );
        })}
        <UpdateCard id={id} />
      </div>
    </div>
  );
};

export default SingleCard;
