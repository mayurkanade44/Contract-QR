import smile from "../images/smile.png";
import bad from "../images/confused.png";
import ugly from "../images/sad.png";
import angry from "../images/angry.png";
import best from "../images/star.png";
import feedback from "../images/feedback.jpg";
import { useState } from "react";
import { useDataContext } from "../context/data_context";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { useParams } from "react-router-dom";

const initialState = {
  efficiency: "",
  work: "",
  behavior: "",
  equipment: "",
  pestService: "Green Shield",
  improvement: "",
  recommend: "",
  aspect: "",
  rating: 0,
};

const NewFeedback = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [thanks, setThanks] = useState(false);

  const { newFeedback } = useDataContext();

  const {
    pestService,
    efficiency,
    work,
    behavior,
    equipment,
    improvement,
    aspect,
    recommend,
  } = formValue;

  const service = [
    "Green Shield",
    "Ratrid",
    "Bugsfree",
    "Mosquito",
    "Termiproof",
    "Antron",
  ];

  const { email, id } = useParams();

  const emo = [
    {
      id: 5,
      image: best,
      name: "Best",
      value: "Best",
    },
    {
      id: 4,
      image: smile,
      name: "Good",
      value: "Good",
    },
    {
      id: 3,
      image: bad,
      name: "Avg",
      value: "Average",
    },
    {
      id: 2,
      image: ugly,
      name: "Bad",
      value: "Bad",
    },
    {
      id: 1,
      image: angry,
      name: "Worst",
      value: "Worst",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emo.map(
      (item) => item.value === efficiency && (formValue.rating = item.id)
    );
    newFeedback(email, id, formValue);
    setFormValue(initialState);
    setTimeout(() => {
      setThanks(true);
    }, 1000);
  };

  return (
    <div className="container my-2 bg-light feedbackbg">
      {!thanks ? (
        <>
          <img src={feedback} alt="feedback" className="feedback-banner mb-2" />

          <form
            onSubmit={handleSubmit}
            className="form-check"
            style={{ paddingLeft: 0 }}
          >
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <h6 className="me-4 pt-2">Select Service:-</h6>
                <select
                  className="form-select d-inline"
                  style={{ width: 200 }}
                  aria-label="Default select example"
                  name="pestService"
                  value={pestService}
                  onChange={handleChange}
                >
                  {service.map((data) => {
                    return (
                      <option value={data} key={data}>
                        {data}
                      </option>
                    );
                  })}
                </select>
              </div>
              <hr className="my-3" />
              <h6 className="text-center">Rate work efficiency</h6>
              <div className="col-1" />
              {emo.map((item) => (
                <div
                  className="col-2 d-flex justify-content-center emo"
                  key={item.id}
                >
                  <input
                    className="form-check-input mt-2"
                    type="radio"
                    name="efficiency"
                    value={item.value}
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label ms-2"
                    htmlFor="flexCheckChecked"
                  >
                    <img src={item.image} alt="ugly" width={30} />
                    <p className="emo-name">{item.name}</p>
                  </label>
                </div>
              ))}
              <hr className="mb-3" />
              <h6 className="text-center">Did our executive know his work?</h6>
              <div className="col-6 d-flex justify-content-center">
                <input
                  className="form-check-input"
                  type="radio"
                  name="work"
                  value="Yes"
                  onChange={handleChange}
                />
                <label
                  className="form-check-label ms-2"
                  htmlFor="flexCheckDefault"
                >
                  <b>Yes</b>
                </label>
              </div>
              <div className="col-6 d-flex justify-content-center">
                <input
                  className="form-check-input"
                  type="radio"
                  name="work"
                  value="No"
                  onChange={handleChange}
                />
                <label
                  className="form-check-label ms-2"
                  htmlFor="flexCheckDefault"
                >
                  <b> No</b>
                </label>
              </div>
              <hr className="my-3" />
              <h6 className="text-center">
                Was our executive in proper safety and good behavior?
              </h6>
              <div className="col-6 d-flex justify-content-center">
                <input
                  className="form-check-input"
                  type="radio"
                  name="behavior"
                  value="Yes"
                  onChange={handleChange}
                />
                <label
                  className="form-check-label ms-2"
                  htmlFor="flexCheckDefault"
                >
                  <b>Yes</b>
                </label>
              </div>
              <div className="col-6 d-flex justify-content-center">
                <input
                  className="form-check-input"
                  type="radio"
                  name="behavior"
                  value="No"
                  onChange={handleChange}
                />
                <label
                  className="form-check-label ms-2"
                  htmlFor="flexCheckDefault"
                >
                  <b>No</b>
                </label>
              </div>
              <hr className="my-3" />
              <h6 className="text-center">
                Did executive use proper non-leaking equipment?
              </h6>
              <div className="col-6 d-flex justify-content-center">
                <input
                  className="form-check-input"
                  type="radio"
                  name="equipment"
                  value="Yes"
                  onChange={handleChange}
                />
                <label
                  className="form-check-label ms-2"
                  htmlFor="flexCheckDefault"
                >
                  <b>Yes</b>
                </label>
              </div>
              <div className="col-6 d-flex justify-content-center">
                <input
                  className="form-check-input"
                  type="radio"
                  name="equipment"
                  value="No"
                  onChange={handleChange}
                />
                <label
                  className="form-check-label ms-2"
                  htmlFor="flexCheckDefault"
                >
                  <b>No</b>
                </label>
              </div>
              <hr className="my-3" />
              <div className="col-md-5">
                <h6 className="text-center textarea">
                  Do you see a need to improve our service at site?
                </h6>
              </div>
              <div className="col-md-6">
                <textarea
                  className="form-control"
                  name="improvement"
                  value={improvement}
                  onChange={handleChange}
                  style={{ height: 75 }}
                ></textarea>
              </div>
              <hr className="my-3" />
              <div className="col-md-5">
                <h6 className="text-center textarea">
                  Would you like to share a good aspect of our service?
                </h6>
              </div>
              <div className="col-md-6">
                <textarea
                  className="form-control"
                  name="aspect"
                  value={aspect}
                  onChange={handleChange}
                  style={{ height: 75 }}
                ></textarea>
              </div>
              <hr className="my-3" />
              <h6 className="text-center">
                Would you recommend our services to an associate?
              </h6>
              <div className="col-6 d-flex justify-content-center">
                <input
                  className="form-check-input"
                  type="radio"
                  name="recommend"
                  value="Yes"
                  onChange={handleChange}
                />
                <label
                  className="form-check-label ms-2"
                  htmlFor="flexCheckDefault"
                >
                  <b>Yes</b>
                </label>
              </div>
              <div className="col-6 d-flex justify-content-center">
                <input
                  className="form-check-input"
                  type="radio"
                  name="recommend"
                  value="No"
                  onChange={handleChange}
                />
                <label
                  className="form-check-label ms-2"
                  htmlFor="flexCheckDefault"
                >
                  <b>No</b>
                </label>
              </div>
              <div className="col-12 d-flex justify-content-center mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  value="Send"
                  disabled={
                    efficiency &&
                    work &&
                    behavior &&
                    equipment &&
                    aspect &&
                    improvement &&
                    recommend &&
                    pestService
                      ? false
                      : true
                  }
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </>
      ) : (
        <div className="text-center" style={{ marginTop: 100 }}>
          <h2 className="text-success">
            Thank You For Your Valuable Feedback.
          </h2>
          <img className="mt-1" src={smile} alt="good" width={60} />
        </div>
      )}
    </div>
  );
};
export default NewFeedback;
