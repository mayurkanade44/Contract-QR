import { Navigate, useParams } from "react-router-dom";
import { useDataContext } from "../context/data_context";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { user, setServiceId } = useDataContext();

  const { id } = useParams();

  useEffect(() => {
    setServiceId({ name: "serviceId", value: id });
  }, [id]);

  console.log(id);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
