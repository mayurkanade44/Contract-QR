import { useDataContext } from "../context/data_context";

const BillContacts = ({ same }) => {
  const { handleChange, billToContact1, billToContact2, billToContact3 } =
    useDataContext();

  return (
    <div className="row ">
      <div className="col-md-4 ">
        <h4 className="text-center">Name</h4>
        <input
          type="text"
          className="form-control mb-2"
          name="name"
          id="billToContact1"
          value={billToContact1.name}
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
          id="billToContact1"
          value={billToContact1.contact}
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
          id="billToContact1"
          value={billToContact1.email}
          onChange={handleChange}
          required
        ></input>
      </div>
      <div className="col-md-4 ">
        <input
          type="text"
          className="form-control mb-2"
          name="name"
          id="billToContact2"
          value={billToContact2.name}
          onChange={handleChange}
        ></input>
      </div>
      <div className="col-md-4 ">
        <input
          type="text"
          className="form-control mb-2"
          name="contact"
          id="billToContact2"
          value={billToContact2.contact}
          onChange={handleChange}
        ></input>
      </div>
      <div className="col-md-4 ">
        <input
          type="email"
          className="form-control mb-2"
          name="email"
          id="billToContact2"
          value={billToContact2.email}
          onChange={handleChange}
        ></input>
      </div>
      <div className="col-md-4 ">
        <input
          type="text"
          className="form-control mb-2"
          name="name"
          id="billToContact3"
          value={billToContact3.name}
          onChange={handleChange}
        ></input>
      </div>
      <div className="col-md-4 ">
        <input
          type="text"
          className="form-control mb-2"
          name="contact"
          id="billToContact3"
          value={billToContact3.contact}
          onChange={handleChange}
        ></input>
      </div>
      <div className="col-md-4 ">
        <input
          type="email"
          className="form-control mb-2"
          name="email"
          id="billToContact3"
          value={billToContact3.email}
          onChange={handleChange}
        ></input>
      </div>
    </div>
  );
};

export default BillContacts;
