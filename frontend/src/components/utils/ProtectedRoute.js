import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { LOGIN_USER } from "../../redux/type";

const ProtectedRoute = ({ auth, children }) => {
  // const user = useSelector((state) => state.Auth.loginUser);

  // console.log("calling protected route");
  const dispatch = useDispatch();

  if (!auth || auth === false) {
    dispatch({ type: LOGIN_USER, user: null });
    return <Navigate to="/login"></Navigate>;
  }
  return children ? children : <Outlet></Outlet>;
};

export default ProtectedRoute;
