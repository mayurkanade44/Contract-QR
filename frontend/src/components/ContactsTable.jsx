import { useDataContext } from "../context/data_context";

const ContactsTable = ({ id, same }) => {
  const { handleChange } = useDataContext();
  const { name, email, contact } = "";

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th className="col-md-4 text-center">Name</th>
            <th className="col-md-4 text-center">Contact Number</th>
            <th className="col-md-4 text-center">Email Id</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                name="name"
                id={id}
                value={name}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="number"
                id={id}
                name="contact"
                value={contact}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="email"
                id={id}
                name="email"
                value={email}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                name="name"
                id={id}
                value={name}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="number"
                id={id}
                name="contact"
                value={contact}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="email"
                id={id}
                name="email"
                value={email}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                name="name"
                id={id}
                value={name}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="number"
                id={id}
                name="contact"
                value={contact}
                onChange={handleChange}
              />
            </td>
            <td>
              <input
                type="email"
                id={id}
                name="email"
                value={email}
                onChange={handleChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ContactsTable;
