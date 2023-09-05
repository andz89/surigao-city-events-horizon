import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);

  if (userInfo) {
    if (userInfo?.data?.user.roles[0] === "user") {
      console.log("running user");
      return <Navigate to="/posts" state={{ from: location }} replace />;
    }
    if (userInfo?.data?.user.roles[0] === "organizer") {
      console.log("running organizer");
      return <Navigate to="/dashboard" state={{ from: location }} replace />;
    }
  } else {
    console.log("running outler");
    return <Outlet />;
  }
};
export default PublicRoute;
