import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../features/auth/usersApiSlice";
import { logout } from "../features/auth/authSlice";

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
        <Link to="/" className="font-semibold text-xl">
          Events Manager
        </Link>
      </div>
      <ul className="flex gap-2 mx-3">
        {userInfo ? (
          <li>
            <button className="flex items-center gap-2" onClick={logoutHanler}>
              <FaSignOutAlt />
              Logout
            </button>
          </li>
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
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
