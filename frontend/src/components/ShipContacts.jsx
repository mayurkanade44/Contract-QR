import { useDataContext } from "../context/data_context";
import { InputRow } from ".";

const ShipContacts = ({ id, same }) => {
  const { handleChange } = useDataContext();
  const { name, email, contact } = "";

  return (
    <div className="row ">
      <div className="col-md-4 ">
        <h4 className="text-center">Name</h4>
        <input
          type="text"
          className="form-control mb-2"
          name="name"
          id="shipToContact1"
          value={name}
          onChange={handleChange}
          required
        ></input>
      </div>
      <div className="col-md-4 ">
        <h4 className="text-center">Contact</h4>
        <input
          type="text"
          className="form-control mb-2"
          name="contact"
          id="shipToContact1"
          value={contact}
          onChange={handleChange}
          required
        ></input>
      </div>
      <div className="col-md-4 ">
        <h4 className="text-center">Email</h4>
        <input
          type="text"
          className="form-control mb-2"
          name="email"
          id="shipToContact1"
          value={email}
          onChange={handleChange}
          required
        ></input>
      </div>
      <div className="col-md-4 ">
        <input
          type="text"
          className="form-control mb-2"
          name="name"
          id="shipToContact2"
          value={name}
          onChange={handleChange}
        ></input>
      </div>
      <div className="col-md-4 ">
        <input
          type="text"
          className="form-control mb-2"
          name="contact"
          id="shipToContact2"
          value={contact}
          onChange={handleChange}
        ></input>
      </div>
      <div className="col-md-4 ">
        <input
          type="text"
          className="form-control mb-2"
          name="email"
          id="shipToContact2"
          value={email}
          onChange={handleChange}
        ></input>
      </div>
      <div className="col-md-4 ">
        <input
          type="text"
          className="form-control mb-2"
          name="name"
          id="shipToContact3"
          value={name}
          onChange={handleChange}
        ></input>
      </div>
      <div className="col-md-4 ">
        <input
          type="text"
          className="form-control mb-2"
          name="contact"
          id="shipToContact3"
          value={contact}
          onChange={handleChange}
        ></input>
      </div>
      <div className="col-md-4 ">
        <input
          type="text"
          className="form-control mb-2"
          name="email"
          id="shipToContact3"
          value={email}
          onChange={handleChange}
        ></input>
      </div>
    </div>
  );
};

export default ShipContacts;
