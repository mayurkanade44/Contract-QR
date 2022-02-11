import React from "react";
import { InputRow } from ".";
import { useDataContext } from "../context/data_context";

const UpdateCard = ({ id }) => {
  const { comments, handleImage, updateCard } = useDataContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCard(id);
  };

  return (
    <div>
      <form className="my-4">
        <div className="row">
          <div className="col-lg-12 my-4">
            <input type="file" accept="image/*" onChange={handleImage} />
          </div>
          <div className="col-lg-4">
            <InputRow
              label="Comments"
              type="text"
              name="comments"
              value={comments}
            />
          </div>
          <div className="col-lg-4 my-1">
            <button
              className="btn btn-dark"
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

export default UpdateCard;