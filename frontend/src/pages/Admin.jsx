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
  } = useDataContext();

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
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-10">
              <InputRow label="Comment" name="addComment" value={addComment} />
            </div>
            <div className="col-md-2">
              <button onClick={saveValues} className="btn mt-1 btn-info ">
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-10">
              <InputRow label="Sales Person" name="addSale" value={addSale} />
            </div>
            <div className="col-md-2">
              <button onClick={saveValues} className="btn btn-info mt-1">
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-10">
              <InputRow label="Business" name="addBusines" value={addBusines} />
            </div>
            <div className="col-md-2">
              <button onClick={saveValues} className="btn btn-info mt-1">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Admin;
