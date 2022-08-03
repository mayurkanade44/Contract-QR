import smile from "../images/smile.png";
import bad from "../images/confused.png";
import ugly from "../images/sad.png";
import { useState } from "react";
import { useDataContext } from "../context/data_context";
import { Link, useParams } from "react-router-dom";

const initialState = {
  efficiency: "",
  work: "",
  behavior: "",
  equipment: "",
  services: "",
};
const Feedback = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [show, setShow] = useState(false);
  const { efficiency, work, behavior, equipment, services } = formValue;
  const { feedback } = useDataContext();
  const { id } = useParams();
  

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    feedback({ formValue, id });
    setFormValue(initialState);
  };

  return (
    <div className="container my-2">
      {!show ? (
        <div className="position-absolute top-50 start-50 translate-middle p-2 mt-4">
          <button
            className="btn btn-primary mb-5 d-block"
            onClick={() => setShow(true)}
          >
            Feedback Form
          </button>
          <Link to={`/service/${id}`}>
            <button className="btn btn-info" style={{ marginLeft: 11 }}>
              Epcorn User
            </button>
          </Link>
        </div>
      ) : (
        <>
          <h2 className="text-center text-info mb-3">
            <u>Feedback Form</u>
          </h2>
          <form onSubmit={handleSubmit} className="form-check">
            <div className="row">
              <h6 className="text-center">Rate work efficiency?</h6>
              <div className="col-4 d-flex justify-content-center">
                <input
                  className="form-check-input mt-2"
                  type="checkbox"
                  name="efficiency"
                  value="Good"
                  onChange={handleChange}
                />
                <label
                  className="form-check-label ms-2"
                  htmlFor="flexCheckDefault"
                >
                  <img src={smile} alt="good" width={30} />
                </label>
              </div>
              <div className="col-4 d-flex justify-content-center">
                <input
                  className="form-check-input mt-2"
                  type="checkbox"
                  name="efficiency"
                  value="Average"
                  onChange={handleChange}
                />
                <label
                  className="form-check-label ms-2"
                  htmlFor="flexCheckChecked"
                >
                  <img src={bad} alt="bad" width={30} />
                </label>
              </div>
              <div className="col-4 d-flex justify-content-center">
                <input
                  className="form-check-input mt-2"
                  type="checkbox"
                  name="efficiency"
                  value="Ugly"
                  onChange={handleChange}
                />
                <label
                  className="form-check-label ms-1"
                  htmlFor="flexCheckChecked"
                >
                  <img src={ugly} alt="ugly" width={30} />
                </label>
              </div>
              <hr className="my-3" />
              <h6 className="text-center">Did our executive know his work?</h6>
              <div className="col-6 d-flex justify-content-center">
                <input
                  className="form-check-input"
                  type="checkbox"
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
                  type="checkbox"
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
                  type="checkbox"
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
                  type="checkbox"
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
                  type="checkbox"
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
                  type="checkbox"
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
              <h6 className="text-center">
                Would you need any additional service?
              </h6>
              <div className="col-5 d-flex justify-content-start">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="services"
                  value="Cockroach"
                  onChange={handleChange}
                />
                <label
                  className="form-check-label ms-2"
                  htmlFor="flexCheckDefault"
                >
                  <b>Cockroach</b>
                </label>
              </div>
              <div className="col-3 d-flex justify-content-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="services"
                  value="Ant"
                  onChange={handleChange}
                />
                <label
                  className="form-check-label ms-2"
                  htmlFor="flexCheckDefault"
                >
                  <b>Ant</b>
                </label>
              </div>
              <div className="col-4 d-flex justify-content-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="services"
                  value="Bedbugs"
                  onChange={handleChange}
                />
                <label
                  className="form-check-label ms-2"
                  htmlFor="flexCheckDefault"
                >
                  <b>Bedbugs</b>
                </label>
              </div>

              <div className="col-4 d-flex justify-content-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="services"
                  value="Mosquito"
                  onChange={handleChange}
                />
                <label
                  className="form-check-label ms-2"
                  htmlFor="flexCheckDefault"
                >
                  <b>Mosquito</b>
                </label>
              </div>
              <div className="col-4 d-flex justify-content-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="services"
                  value="Termite"
                  onChange={handleChange}
                />
                <label
                  className="form-check-label ms-2"
                  htmlFor="flexCheckDefault"
                >
                  <b>Termite</b>
                </label>
              </div>
              <div className="col-12 d-flex justify-content-center mt-1">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};
export default Feedback;
