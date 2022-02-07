import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDataContext } from "../context/data_context";

const SingleCard = () => {
  const { card, fetchSingleCard } = useDataContext();
  const { id } = useParams();
  console.log(card);

  useEffect(() => {
    fetchSingleCard(id);
  }, [id]);
  return (
    <div className="container">
      <div className="my-5">
        {card.map((card) => {
          const { area, contract, _id, service } = card;
          return (
            <div key={_id}>
              <h2 className="text-center">{`Contract Number: ${contract.contractNo}`}</h2>
              <h2 className="text-center">{`Services: ${service}`}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SingleCard;
