import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo?.data?.user.roles);
  if (userInfo?.data?.user.roles) {
    if (
      userInfo?.data?.user.roles?.some((role) => allowedRoles?.includes(role))
    ) {
      return <Outlet />;
    } else {
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};
// const PrivateRoute = ({ allowedRoles }) => {
//   const location = useLocation();
//   const { userInfo } = useSelector((state) => state.auth);

//   return userInfo?.data?.user.roles?.find((role) =>
//     allowedRoles?.includes(role)
//   ) ? (
//     <Outlet />
//   ) : userInfo?.data ? ( //changed from user to accessToken to persist login after refresh
//     <Navigate to="/unauthorized" state={{ from: location }} replace />
//   ) : (
//     <Navigate to="/login" state={{ from: location }} replace />
//   );
// };
export default PrivateRoute;
