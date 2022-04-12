import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, InputRow, Loading } from "../components";
import { useDataContext } from "../context/data_context";

const Admin = () => {
  const {
    fetchAllUsers,
    users,
    removeUser,
    displayAlert,
    showAlert,
    del,
    loading,
    addComment,
    addComments,
    addSale,
    addSales,
    addBusines,
    addBusiness,
    serviceChemicals,
    addServiceChemicals,
  } = useDataContext();

  const { label, value, chemical } = serviceChemicals;

  useEffect(() => {
    fetchAllUsers();
    // eslint-disable-next-line
  }, [del]);

  const [showUser, setShowUser] = useState(false);

  const deleteUser = (id) => {
    removeUser(id);
    displayAlert();
  };

  const saveValues = () => {
    if (addSale) {
      addSales();
    } else if (addBusines) {
      addBusiness();
    } else if (addComment) {
      addComments();
    } else if (serviceChemicals) {
      addServiceChemicals();
    }
    displayAlert();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      {showAlert && <Alert />}
      <button
        onClick={() => setShowUser(!showUser)}
        className="btn my-3 btn-info btn-lg"
      >
        All Users
      </button>
      {showUser && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Role</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  {user.role === "Admin" ? (
                    <td>
                      <Link to="/register">
                        <button className="btn btn-success">Add User</button>
                      </Link>
                    </td>
                  ) : (
                    <td>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="btn btn-danger"
                      >
                        Remove User
                      </button>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <div className="row">
        <div className="col-md-5">
          <InputRow label="Comment" name="addComment" value={addComment} />
        </div>
        <div className="col-md-1">
          <button onClick={saveValues} className="btn mt-1 btn-info ">
            Save
          </button>
        </div>
        <div className="col-md-5">
          <InputRow label="Sales Person" name="addSale" value={addSale} />
        </div>
        <div className="col-md-1">
          <button onClick={saveValues} className="btn mt-1 btn-info ">
            Save
          </button>
        </div>
        <div className="col-md-5">
          <InputRow label="Business" name="addBusines" value={addBusines} />
        </div>
        <div className="col-md-1">
          <button onClick={saveValues} className="btn mt-1 btn-info ">
            Save
          </button>
        </div>
        <div className="col-md-6"></div>
        <div className="col-md-4">
          <InputRow
            label="Service Name:"
            id="serviceChemicals"
            type="text"
            name="label"
            value={label}
          />
        </div>
        <div className="col-md-3">
          <InputRow
            label="Value:"
            id="serviceChemicals"
            type="text"
            name="value"
            value={value}
          />
        </div>
        <div className="col-md-5">
          <InputRow
            label="Chemicals:"
            id="serviceChemicals"
            type="text"
            name="chemical"
            value={chemical}
          />
        </div>
      </div>
    </div>
  );
};
export default Admin;
