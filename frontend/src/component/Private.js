import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  console.log(userInfo.data.user.roles);
  return userInfo.data.user.roles?.find((role) =>
    allowedRoles?.includes(role)
  ) ? (
    <Outlet />
  ) : userInfo?.data ? ( //changed from user to accessToken to persist login after refresh
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" replace />
  );
};
export default PrivateRoute;
