import smile from "../images/smile.png";
import bad from "../images/confused.png";
import ugly from "../images/sad.png";
import angry from "../images/angry.png";
import best from "../images/star.png";
import feedback from "../images/feedback.jpg";
import { useEffect, useState } from "react";
import { useDataContext } from "../context/data_context";
import { useParams, Link, useNavigate } from "react-router-dom";

const initialState = {
  efficiency: "",
  work: "",
  behavior: "",
  equipment: "",
  pestService: "",
  improvement: "",
  recommend: "",
  aspect: "",
  rating: 0,
};
const Feedback = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [show, setShow] = useState(false);
  const [thanks, setThanks] = useState(false);
  const { newFeedback, role, user, setServiceId } = useDataContext();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id.split("-").length > 1) setShow(true);
    setServiceId({ name: "serviceId", value: id });

    // eslint-disable-next-line
  }, [id]);

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

  const service = [
    "Termites",
    "Green Shield",
    "Mosquito",
    "Ratrid",
    "Antron",
    "Bugsfree",
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
    newFeedback(id, formValue);
    setFormValue(initialState);
    setTimeout(() => {
      setThanks(true);

      setShow(false);
    }, 1000);
  };

  const handleRedirect = () => {
    if (user) {
      if (role === "B2") navigate(`/service-intimation/${id}`);
      else if (role === "Operator") navigate(`/service/${id}`);
    } else {
      navigate(`/login`);
    }
  };

  return (
    <div className="container my-2">
      {!show && !thanks ? (
        <div className="position-absolute top-50 start-50 translate-middle p-2 mt-4">
          <button
            className="btn btn-primary mb-5 d-block"
            onClick={() => setShow(true)}
          >
            Customer Feedback
          </button>
          <button className="btn btn-info" onClick={handleRedirect}>
            Service Card Report
          </button>
        </div>
      ) : show ? (
        <>
          <img src={feedback} alt="feedback" className="feedback-banner mb-2" />
          <form
            onSubmit={handleSubmit}
            className="form-check"
            style={{ paddingLeft: 0 }}
          >
            <div className="row">
              <h6 className="me-4 pt-2 text-center">Please Select Service</h6>
              {service.map((item) => (
                <div className="col-4 d-flex justify-content-center" key={item}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="pestService"
                    value={item}
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label ms-2"
                    htmlFor="flexCheckDefault"
                  >
                    <b>{item}</b>
                  </label>
                </div>
              ))}

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
                  Mention the improvements needed in our services.
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
                Would you recommend our services to an someone?
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
            Thank you for sharing your valuable feedback. Your feedback has been
            recorded.
          </h2>
          <img className="mt-1" src={smile} alt="good" width={60} />
        </div>
      )}
    </div>
  );
};
export default Feedback;
