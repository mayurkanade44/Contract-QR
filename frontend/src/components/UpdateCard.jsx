import React, { useEffect } from "react";
import { InputRow } from ".";
import { useDataContext } from "../context/data_context";

const UpdateCard = ({ id }) => {
  const { image, comments, handleImage, updateCard } = useDataContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCard(id);
  };

  return (
    <div>
      <form>
        <input type="file" accept="image/*" onChange={handleImage} />
        <InputRow
          label="Comments"
          type="text"
          name="comments"
          value={comments}
        />
        <button className="btn btn-dark" type="submit" onClick={handleSubmit}>
          Save
        </button>
      </form>
    </div>
  );
};

export default UpdateCard;
