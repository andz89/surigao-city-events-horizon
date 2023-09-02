import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../features/authUser/usersApiSlice";
import { logout } from "../features/authUser/authSlice";

const Header = () => {
  const navigage = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const logoutHanler = async () => {
    try {
      console.log("1");
      await logoutApiCall().unwrap();
      console.log("2");
      dispatch(logout());
      navigage("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="bg-slate-300 flex justify-between items-center p-2">
      <div>
        <span className="font-semibold text-xl">
          Surigao City Event Horizons
        </span>
      </div>
      <ul className="flex gap-2 mx-3 items-center font-semibold">
        {userInfo ? (
          <>
            <li>
              <Link to={"/posts"}> Post</Link>{" "}
            </li>
            <li>
              <Link to={"/profile"}> Profile </Link>{" "}
            </li>
            <li>
              <button
                className="flex items-center gap-2 bg-dark px-2 py-1 text-white rounded"
                onClick={logoutHanler}
              >
                <FaSignOutAlt />
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="flex items-center gap-2">
                {" "}
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="flex items-center gap-2">
                <FaUser />
                Register
              </Link>
            </li>
            <li className="bg-teal-700 p-2 rounded text-white">
              <Link to={"/login-organizer"} className="font-semibold">
                Organizer
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
