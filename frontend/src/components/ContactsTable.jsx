import { useDataContext } from "../context/data_context";
import { InputRow } from ".";

const ContactsTable = ({ id, same }) => {
  const { handleChange } = useDataContext();
  const { name, email, contact } = "";

  return (
    <div className="row ">
      <div className="col-md-4 ">
        <h4 className="text-center">Name</h4>
        <div className="row">
          <div className="col-12">
            <input
              type="text"
              className="form-control mb-2"
              name="name"
              id={id}
              value={name}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className="col-12">
            <input
              type="text"
              className="form-control mb-2"
              name="name"
              id={id}
              value={name}
              onChange={handleChange}
            ></input>
          </div>
          <div className="col-12">
            <input
              type="text"
              className="form-control mb-2"
              name="name"
              id={id}
              value={name}
              onChange={handleChange}
            ></input>
          </div>
        </div>
      </div>
      <div className="col-md-4 ">
        <h4 className="text-center">Contact</h4>
        <div className="row">
          <div className="col-12">
            <input
              type="number"
              className="form-control mb-2"
              id={id}
              name="contact"
              value={contact}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className="col-12">
            <input
              type="number"
              className="form-control mb-2"
              id={id}
              name="contact"
              value={contact}
              onChange={handleChange}
            ></input>
          </div>
          <div className="col-12">
            <input
              type="number"
              className="form-control mb-2"
              id={id}
              name="contact"
              value={contact}
              onChange={handleChange}
            ></input>
          </div>
        </div>
      </div>
      <div className="col-md-4 ">
        <h4 className="text-center">Email</h4>
        <div className="row">
          <div className="col-12">
            <input
              type="email"
              className="form-control mb-2"
              id={id}
              name="email"
              value={email}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className="col-12">
            <input
              type="email"
              className="form-control mb-2"
              id={id}
              name="email"
              value={email}
              onChange={handleChange}
            ></input>
          </div>
          <div className="col-12">
            <input
              type="email"
              className="form-control mb-2"
              id={id}
              name="email"
              value={email}
              onChange={handleChange}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsTable;
