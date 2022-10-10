import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, InputRow, Loading, Modal } from "../components";
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
    searchSD,
    searchED,
    allJobData,
    modal,
  } = useDataContext();

  const { label, value, chemical } = serviceChemicals;

  useEffect(() => {
    fetchAllUsers();
    // eslint-disable-next-line
  }, [del]);

  const [showUser, setShowUser] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [showSales, setShowSales] = useState(false);
  const [showService, setShowService] = useState(false);
  const [showBusiness, setShowBusiness] = useState(false);
  const [showJobFile, setShowJobFile] = useState(false);

  const deleteUser = (id) => {
    removeUser(id);
    displayAlert();
  };

  const generateFile = (e) => {
    e.preventDefault();
    allJobData();
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
      {modal && <Modal />}
      <button
        onClick={() => setShowUser(!showUser)}
        className="btn my-3 me-3 btn-info btn-lg"
      >
        All Users
      </button>
      <button
        onClick={() => setShowSales(!showSales)}
        className="btn m-3 btn-info btn-lg"
      >
        Add Sales Person
      </button>
      <button
        onClick={() => setShowBusiness(!showBusiness)}
        className="btn m-3 btn-info btn-lg"
      >
        Add Business
      </button>
      <button
        onClick={() => setShowService(!showService)}
        className="btn m-3 btn-info btn-lg"
      >
        Add Service &amp; Chemical
      </button>
      <button
        onClick={() => setShowComment(!showComment)}
        className="btn m-3 btn-info btn-lg"
      >
        Add Service Comment
      </button>
      <button
        onClick={() => setShowJobFile(!showJobFile)}
        className="btn my-3 me-3 btn-info btn-lg"
      >
        All Job Report
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
        {showComment && (
          <div className="col-md-5">
            <InputRow label="Comment" name="addComment" value={addComment} />
          </div>
        )}
        {showSales && (
          <div className="col-md-5">
            <InputRow label="Sales Person" name="addSale" value={addSale} />
          </div>
        )}
        {showBusiness && (
          <div className="col-md-5">
            <InputRow label="Business" name="addBusines" value={addBusines} />
          </div>
        )}
        {showService && (
          <>
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
            <div className="col-md-4">
              <InputRow
                label="Chemicals:"
                id="serviceChemicals"
                type="text"
                name="chemical"
                value={chemical}
              />
            </div>
          </>
        )}
        {(showComment || showSales || showService || showBusiness) && (
          <div className="col-md-1">
            <button onClick={saveValues} className="btn mt-1 btn-info ">
              Save
            </button>
          </div>
        )}
      </div>
      {showJobFile && (
        <form className="row" onSubmit={generateFile}>
          <div className="col-md-4">
            <InputRow
              label="From :"
              type="date"
              name="searchSD"
              value={searchSD}
              width={200}
            />
          </div>
          <div className="col-md-4">
            <InputRow
              label="To :"
              type="date"
              name="searchED"
              value={searchED}
              width={200}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary">Generate File</button>
          </div>
        </form>
      )}
    </div>
  );
};
export default Admin;
