import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/organizersView/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./component/Header";
import LandingPage from "./pages/LandingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginOrganizer from "./pages/LoginOrganizer";
import Profile from "./pages/Profile";
import Private from "./component/Private";
import RegisterOrganizer from "./pages/RegisterOrganizer";

//users view/page
import Posts from "./pages/usersView/posts";
function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            {/* <Route path="/" element={<Dashboard />}></Route> */}
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login-organizer" element={<LoginOrganizer />}></Route>
            <Route
              path="/register-organizer"
              element={<RegisterOrganizer />}
            ></Route>
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
          </Routes>
        </div>
        ;
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
