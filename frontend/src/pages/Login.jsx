import React, { useEffect, useState } from "react";
import { Alert } from "../components";
import { useDataContext } from "../context/data_context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { showAlert, loading, displayAlert, loginUser, user, serviceId, role } =
    useDataContext();
  const [values, setValues] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, password } = values;
    if (!name || !password) {
      displayAlert();
      return;
    }
    loginUser(values);
  };

  useEffect(() => {
    if (user) {
      if (role === "B2") navigate(`/service-intimation/${serviceId}`);
      else if (role === "Operator") navigate(`/service/${serviceId}`);
      else navigate("/dashboard");
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <div className="position-absolute top-50 start-50 translate-middle border border-info p-4 mt-4">
      {showAlert && <Alert />}
      <h1 className="text-center mb-4">Login</h1>
      <div className="d-flex justify-content-center">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="name"
              className="form-control"
              name="name"
              value={values.name}
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
          <button type="submit" className="btn btn-primary mt-2">
            {loading ? "loading...." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
