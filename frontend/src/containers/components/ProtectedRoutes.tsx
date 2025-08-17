import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext";

const ProductRoutes = () => {
  const auth = useAuth();
  if (!auth?.isAuth) {
    return <Navigate to="/login" replace></Navigate>;
  }
  return <Outlet />;
};

export default ProductRoutes;
