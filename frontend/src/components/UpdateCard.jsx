import React, { useEffect } from "react";
import { InputSelect, Alert } from ".";
import { useDataContext } from "../context/data_context";

const UpdateCard = ({ id }) => {
  const {
    comments,
    handleImage,
    updateCard,
    completion,
    image,
    showAlert,
    displayAlert,
    adminList,
    allValues,
  } = useDataContext();
  const remarks = ["Completed", "Not Completed", "Partially Completed"];

  useEffect(() => {
    allValues();
  }, []);

  // const commentsList = [
  //   "All job done",
  //   "Found infestation, treatment done",
  //   "Found crack, gap in fixture & structure",
  //   "Client said to come another day",
  //   "There was a meeting at the office",
  //   "Reached late due to prior delayed appointment/traffic delay",
  //   "Client cancelled & asked to reschedule",
  //   "Client cancelled due to health issue",
  //   "Internal representatice of EPCORN cancelled job",
  //   "No work onsite - Interior/Civil works site visited",
  //   "Since schedule works completed, additional work not allowed as no pest concern",
  // ];

  const commentsList = [];
  if (adminList) {
    adminList.map(
      (item) =>
        item.commentsList !== undefined && commentsList.push(item.commentsList)
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCard(id);
    displayAlert();
  };

  return (
    <div>
      <form className="my-4 ">
        <div className="row">
          <div className="col-lg-3 my-2">
            <input type="file" accept="image/*" onChange={handleImage} />
          </div>
          <div className="col-lg-4 mb-2">
            <InputSelect
              label="Completion"
              name="completion"
              value={completion}
              data={remarks}
            />
          </div>
          <div className="col-lg-4 mb-2">
            <InputSelect
              label="Comments"
              name="comments"
              value={comments}
              data={commentsList}
            />
          </div>
          <div className="col-lg-1 my-1">
            <button
              className="btn btn-dark"
              type="submit"
              onClick={handleSubmit}
              disabled={image ? false : true}
            >
              Save
            </button>
          </div>
          <div className="col-md-12">{showAlert && <Alert />}</div>
        </div>
      </form>
    </div>
  );
};

export default UpdateCard;
