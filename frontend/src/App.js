import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/organizersView/Dashboard";
import Login from "./pages/usersView/Login";
import Register from "./pages/usersView/Register";

import LandingPage from "./pages/usersView/LandingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersistLogin from "./component/PersistLogin";
import LoginOrganizer from "./pages/organizersView/LoginOrganizer";
import ProfileUser from "./pages/usersView/Profile";
import Private from "./component/Private";
import RegisterOrganizer from "./pages/organizersView/RegisterOrganizer";
import Unauthorized from "./component/Unauthorized";
import PublicRoute from "./component/Public";
import ProfileOrganizer from "./pages/organizersView/Profile";
import Posts from "./pages/usersView/Posts";
import UpdatePasswordUser from "./pages/usersView/UpdatePassword";
import UpdatePasswordOrganizer from "./pages/organizersView/UpdatePassword";

import PublicPosts from "./pages/organizersView/PublicPosts";

import Main from "./component/HeaderAndsidebar/Main";
import SinglePage from "./pages/organizersView/SinglePage";
import SinglePagePublic from "./pages/usersView/SinglePage";
import SavedEvents from "./pages/usersView/SavedEvents";

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
                <Route path="*" element={<Unauthorized />} />

                <Route
                  path="/register-organizer"
                  element={<RegisterOrganizer />}
                ></Route>
              </Route>

              {/*users view */}

              <Route path="" element={<Private allowedRoles={["user"]} />}>
                <Route path="/profile-user" element={<ProfileUser />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/savedEvents" element={<SavedEvents />} />

                <Route path="/profile/:id" element={<SinglePagePublic />} />
                <Route
                  path="/updatePasswordUser"
                  element={<UpdatePasswordUser />}
                />
              </Route>
              {/*organizer view */}
              <Route path="" element={<Private allowedRoles={["organizer"]} />}>
                <Route element={<Main />}>
                  <Route path="/dashboard" element={<Dashboard />} />

                  <Route
                    path="/profile-organizer"
                    element={<ProfileOrganizer />}
                  />

                  <Route
                    path="/updatePasswordOrganizer"
                    element={<UpdatePasswordOrganizer />}
                  />
                </Route>
                <Route path="/publicPost/:id" element={<SinglePagePublic />} />
                <Route path="/home/:id" element={<SinglePage />} />
                <Route path="/publicPost" element={<PublicPosts />} />
              </Route>

              <Route
                path=""
                element={<Private allowedRoles={["user", "organizer"]} />}
              ></Route>
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
