import React, { useEffect, useState } from "react";
import { Alert } from "../components";
import { useDataContext } from "../context/data_context";

const Register = () => {
  const { showAlert, loading, displayAlert } = useDataContext();
  const [values, setValues] = useState({
    username: "",
    password: "",
    role: "Sales",
  });

  const roles = ["Sales", "Oprator"];

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = values;
    if (!username || !password) {
      displayAlert();
      return;
    }
    console.log(values);
  };
  return (
    <div className="position-absolute top-50 start-50 translate-middle border border-info p-4 mt-4">
      {showAlert && <Alert />}
      <h1 className="text-center mb-4">Register</h1>
      <div className="d-flex justify-content-center">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="username"
              className="form-control"
              name="username"
              value={values.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={values.password}
              onChange={handleChange}
              required
              minLength="5"
            />
            <span className="form-text">Must be 5 characters long.</span>
          </div>
          <div className="row mt-2">
            <div className="col-md-4">
              <h4>Role</h4>
            </div>
            <div className="col-md-7">
              <select
                className="form-select"
                aria-label="Default select example"
                name="role"
                value={values.role}
                onChange={handleChange}
              >
                {roles.map((data) => {
                  return (
                    <option value={data} key={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            {loading ? "loading...." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
