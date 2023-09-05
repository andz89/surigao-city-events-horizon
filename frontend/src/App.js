import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/organizersView/Dashboard";
import Login from "./pages/usersView/Login";
import Register from "./pages/usersView/Register";

import LandingPage from "./pages/usersView/LandingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersistLogin from "./component/PersistLogin";
import LoginOrganizer from "./pages/organizersView/LoginOrganizer";
import Profile from "./pages/Profile";
import Private from "./component/Private";
import RegisterOrganizer from "./pages/organizersView/RegisterOrganizer";
import Unauthorized from "./component/Unauthorized";
import PublicRoute from "./component/Public";

import Posts from "./pages/usersView/posts";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route element={<PersistLogin />}>
              <Route path="" element={<PublicRoute />}>
                <Route path="/" element={<LandingPage />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route
                  path="/login-organizer"
                  element={<LoginOrganizer />}
                ></Route>
                <Route path="unauthorized" element={<Unauthorized />} />
                <Route
                  path="/register-organizer"
                  element={<RegisterOrganizer />}
                ></Route>
              </Route>

              {/*users view */}

              <Route path="" element={<Private allowedRoles={["user"]} />}>
                <Route path="/posts" element={<Posts />} />
              </Route>

              <Route path="" element={<Private allowedRoles={["organizer"]} />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>

              <Route
                path=""
                element={<Private allowedRoles={["user", "organizer"]} />}
              >
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Route>
          </Routes>
        </div>
        ;
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
