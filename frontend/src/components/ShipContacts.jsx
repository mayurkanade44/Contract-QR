import { useDataContext } from "../context/data_context";

const ShipContacts = ({ same }) => {
  const { handleChange, shipToContact1, shipToContact2, shipToContact3 } =
    useDataContext();

  return (
    <div className="row ">
      <div className="col-md-4 ">
        <h4 className="text-center">Name</h4>
        <input
          type="text"
          className="form-control mb-2"
          name="name"
          id="shipToContact1"
          value={shipToContact1.name}
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
          value={shipToContact1.contact}
          onChange={handleChange}
          required
        ></input>
      </div>
      <div className="col-md-4 ">
        <h4 className="text-center">Email</h4>
        <input
          type="email"
          className="form-control mb-2"
          name="email"
          id="shipToContact1"
          value={shipToContact1.email}
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
          value={shipToContact2.name}
          onChange={handleChange}
        ></input>
      </div>
      <div className="col-md-4 ">
        <input
          type="text"
          className="form-control mb-2"
          name="contact"
          id="shipToContact2"
          value={shipToContact2.contact}
          onChange={handleChange}
        ></input>
      </div>
      <div className="col-md-4 ">
        <input
          type="email"
          className="form-control mb-2"
          name="email"
          id="shipToContact2"
          value={shipToContact2.email}
          onChange={handleChange}
        ></input>
      </div>
      <div className="col-md-4 ">
        <input
          type="text"
          className="form-control mb-2"
          name="name"
          id="shipToContact3"
          value={shipToContact3.name}
          onChange={handleChange}
        ></input>
      </div>
      <div className="col-md-4 ">
        <input
          type="text"
          className="form-control mb-2"
          name="contact"
          id="shipToContact3"
          value={shipToContact3.contact}
          onChange={handleChange}
        ></input>
      </div>
      <div className="col-md-4 ">
        <input
          type="email"
          className="form-control mb-2"
          name="email"
          id="shipToContact3"
          value={shipToContact3.email}
          onChange={handleChange}
        ></input>
      </div>
    </div>
  );
};

export default ShipContacts;
