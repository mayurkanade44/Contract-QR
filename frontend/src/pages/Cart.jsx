import { Alert } from "../components";
import { useDataContext } from "../context/data_context";

const Cart = () => {
  const {
    loading,
    feedbackEmails,
    removeEmail,
    createContactList,
    showAlert,
    displayAlert,
    scheduleMail,
    listCreated,
  } = useDataContext();

  const createList = () => {
    createContactList();
    displayAlert();
  };

  const mailSend = () => {
    scheduleMail();
    displayAlert();
  };

  return (
    <div className="container ">
      {showAlert && <Alert />}
      <div className="row d-flex justify-content-center mt-5">
        <div className="col-6 ">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Email Ids</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {feedbackEmails.map((item, index) => (
                <tr key={index}>
                  <th>{item.email}</th>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeEmail(item.email)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-3">
          {!listCreated ? (
            <button
              className="btn btn-primary m-5"
              onClick={createList}
              disabled={feedbackEmails.length === 0 ? true : false}
            >
              Create Contact List
            </button>
          ) : (
            <button className="btn btn-success m-5" onClick={mailSend}>
              Schedule Email
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Cart;
