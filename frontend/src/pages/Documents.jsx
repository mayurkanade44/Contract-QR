import { useState } from "react";
import moment from "moment";
import { useDataContext } from "../context/data_context";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "../components";

const Documents = () => {
  const {
    documentUpload,
    singleContract,
    displayAlert,
    showAlert,
    deleteDocFile,
    role,
  } = useDataContext();
  const [filename, setFilename] = useState("");
  const [description, setDescription] = useState("");
  const [doc, setDoc] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();

    form.set("date", moment(new Date()).format("DD/MM/YYYY"));
    form.set("fileName", filename);
    form.set("description", description);
    form.append("doc", doc);

    documentUpload({ id, form });
    setDescription("");
    setFilename("");
    setDoc("");
    displayAlert();
  };

  const handleDelete = (num) => {
    const filterDocs = singleContract.document?.filter(
      (item, index) => index !== num
    );
    deleteDocFile({ id, filterDocs });
    displayAlert();
    setTimeout(() => {
      navigate(`/contract/${id}`);
    }, 2000);
  };

  return (
    <div className="container my-2">
      {showAlert && <Alert />}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4">
            <label className="me-2">
              <h4>File Name: </h4>
            </label>
            <input
              label="File Name :"
              type="text"
              name="filename"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="me-2">
              <h4>Description: </h4>
            </label>
            <input
              label="File Name :"
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="file"
              onChange={(e) => setDoc(e.target.files[0])}
              required
            />
          </div>
          <div className="col-md-1">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </form>
      <table className="table table-bordered mt-2">
        <thead>
          <tr>
            <th className="text-center" style={{ width: 200 }}>
              Date
            </th>
            <th className="text-center">File Name</th>
            <th className="text-center">Description</th>
            <th className="text-center" style={{ width: 300 }}>
              Download
            </th>
          </tr>
        </thead>
        <tbody>
          {singleContract.document?.map((item, index) => (
            <tr key={index}>
              <td className="text-center">{item.date}</td>
              <td>{item.fileName}</td>
              <td>{item.description}</td>
              <td className="text-center">
                <button className="btn btn-success">
                  <a
                    style={{
                      textDecoration: "none",
                      color: "white",
                    }}
                    href={item.file}
                  >
                    Download
                  </a>
                </button>
                {role === "Admin" && (
                  <button
                    className="btn btn-danger ms-4"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Documents;
