import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../features/authUser/usersApiSlice";
import { logout } from "../features/authUser/authSlice";
import LoadingSpinner from "./LoadingSpinner";

const Header = () => {
  const navigage = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall, { isLoading }] = useLogoutMutation();
  const logoutHanler = async () => {
    try {
      await logoutApiCall().unwrap();

      dispatch(logout());
      navigage("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <header className="bg-slate-300 sticky top-0 flex flex-col z-50 sm:flex-row justify-between items-center p-2">
        <div className="text-center sm:text-left ">
          <ul className="flex items-end gap-3 justify-center">
            <li>
              <Link className=" text-2xl font-semibold">
                Surigao City Events Horizons
              </Link>
            </li>
          </ul>
        </div>
        <ul className="flex  sm:text-base    gap-4 mx-3 items-center font-semibold">
          {userInfo ? (
            <>
              {userInfo.data?.user.roles[0] === "user" && (
                <>
                  <li className="hover:underline">
                    <Link to={"/posts"}>Post</Link>
                  </li>
                  <li className="hover:underline">
                    <Link to={"/savedEvents"}>Saved Events</Link>
                  </li>
                  <li className="hover:underline">
                    <Link to={"/profile-user"}>Profile</Link>
                  </li>
                  <li>
                    <button
                      className="flex items-center text-[16px] hover:bg-slate-100 p-1 rounded"
                      onClick={logoutHanler}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
              {userInfo.data?.user.roles[0] === "organizer" && (
                <>
                  <li>
                    <Link
                      to={`/home/${userInfo.data.user.userId}`}
                      className="font-semibold"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/publicPost"> Posts</Link>
                  </li>
                  <li>
                    <Link to={"/dashboard"} className="font-semibold">
                      Settings
                    </Link>
                  </li>
                </>
              )}
              {userInfo.data?.user.roles[0] === "admin" && (
                <>
                  <li>
                    <Link to={`/agency-dashboard`} className="font-semibold">
                      Agency
                    </Link>
                  </li>
                  <li>
                    <Link to={`/post-dashboard`} className="font-semibold">
                      Post
                    </Link>
                  </li>
                  <li>
                    <button
                      className="flex items-center text-[16px] hover:bg-slate-100 p-1 rounded"
                      onClick={logoutHanler}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="flex items-center gap-2">
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="flex items-center gap-2">
                  <FaUser />
                  Register
                </Link>
              </li>
              <li className="  p-2 rounded  ">
                <Link to={"/login-organizer"} className="font-semibold">
                  Organizer
                </Link>
              </li>
              <li className="bg-teal-700 p-2 rounded text-white">
                <Link to={"/admin-login"} className="font-semibold">
                  Admin
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </>
  );
};

export default Header;
