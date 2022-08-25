import { useContext, useEffect, useState } from "react";
import './App.css';
import ReactGA from "react-ga";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import PrivateOutletUser from "../src/PrivateOutletUser";
import AdminHome from "./components/AdminDashboard.jsx/AdminHome.jsx";
import AdminUserSheet from "./components/AdminDashboard.jsx/AdminUserSheet.jsx";
import AdminLogin from "./components/AdminDashboard.jsx/AdminLogin.jsx";
import MembersPage from "./components/AdminDashboard.jsx/MembersPage.jsx";
import ProfilePageAdmin from "./components/AdminDashboard.jsx/ProfilePageAdmin.jsx";
import AdvanceSearch from "./components/Dashboard/AdvanceSearch.jsx";
import BasicSearch from "./components/Dashboard/BasicSearch.jsx";
import DashboardHome from "./components/Dashboard/DashboardHome.jsx";
import IdSearch from "./components/Dashboard/IdSearch.jsx";
import MyProfile from "./components/Dashboard/MyProfile.jsx";
import Adduserid from "./components/Dashboard/Adduserid";

import Notification from "./components/Dashboard/Notification";
import PreferencePage from "./components/Dashboard/PreferencePage.jsx";
import ProfilePage from "./components/Dashboard/ProfilePage.jsx";
import Menu from "./components/navbar/Menu.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import ChangePassword from "./components/Register/ChangePassword.jsx";
import ConfirmEmail from "./components/Register/ConfirmEmail.jsx";
import ForgotPassword from "./components/Register/ForgotPassword.jsx";
import NewUser from "./components/Register/NewUser.jsx";
import { StateContext } from "./context/StateProvider.js";
import AboutUsPage from "./pages/AboutUsPage.js";
import ContactUsPage from "./pages/ContactUsPage.js";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MembershipPage from "./pages/MembershipPage";
import Page404 from "./pages/Page404";
import Setting from "./pages/Setting.js";
import urls from "./urls/urls";
import WhoViewedMyProfile from "./components/WhoViewedMyProfile/WhoViewedMyProfile";
import Unsubscribe from "./components/Unsubscribe/Unsubscribe";
import Payment from "./components/Membership/Payment";
import PaymentSuccess from "./components/PaymentSuccess/PaymentSuccess";
import AdminMember from "./components/AdminDashboard.jsx/AdminMember";

// import AdminHome from "/components/AdminDashboard/AdminHome.jsx"
const axios = require("axios");
const { useNavigate } = require("react-router-dom");



// import fetchUser from "../../backend/middleware/authdata.js";

function usePageViews() {
  let location = useLocation;
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      ReactGA.initialize("UA-230070418-1");
      window.GA_INITIALIZED = true;
    }
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }, [location]);
}

function App() {
  usePageViews();
  const { user, setUser, setregisterDet, isLoggedIn, setisLoggedIn } =
    useContext(StateContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(localStorage.getItem("tokenName")){
      localStorage.removeItem("tokenName")
    }
    const checkLoggedIn = async () => {
      setIsLoading(true);
      let token = localStorage.getItem("auth-token");

      if (!token) {
        setisLoggedIn(false);
        setIsLoading(false);
        return;
      }

      const tokenRes = await axios.post("/api/auth/isTokenValid", null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (tokenRes.data) {
        const userRes = await axios.get("/api/auth/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser({
          token: token,
          user: userRes.data,
        });
        setregisterDet(user.user);
        setisLoggedIn(true);
        setIsLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  function navigationBar() {
    if (isLoading) return <p className="text-center font-mono"></p>;
    else return isLoggedIn ? <Menu /> : <Navbar />;
  }

  return (
    
    
    <BrowserRouter>
      {navigationBar()}
      <Routes>
        
        <Route exact path={urls.home} element={<Home />} />
        <Route exact path={urls.confirmEmail} element={<ConfirmEmail />} />
        <Route exact path={urls.login} element={<Login />} />
        <Route exact path={urls.forgot} element={<ForgotPassword />} />
        <Route exact path={urls.changePassword} element={<ChangePassword />} />
        <Route exact path={urls.membership} element={<MembershipPage />} />
        <Route exact path={urls.contact} element={<ContactUsPage />} />
        <Route exact path={urls.whoviewedmyprofile} element={<WhoViewedMyProfile  />} />
        <Route exact path={urls.unsubscribe} element={<Unsubscribe />} />
        <Route exact path={urls.about} element={<AboutUsPage />} />
        <Route exact path={urls.adduserid} element={<Adduserid />} />
        <Route exact path={"/payment/:type/:price/:months/:id/:fullname"} element={<Payment />} />
        <Route exact path={urls.paymentSuccess} element={<PaymentSuccess />} />
        {/* <Route exact path={urls.contactpopup} element={<ContactPopup/>} /> */}
        {/* <Route exact path={"/admin"} element={<AdminHome />} /> */}
        
        <Route
          exact
          path="/"
          element={<PrivateOutletUser isLoading={isLoading} />}
        >
          <Route exact path={urls.dashboard} element={<DashboardHome />} />
          <Route exact path={urls.idsearch} element={<IdSearch />} />
          <Route exact path={urls.basicsearch} element={<BasicSearch />} />
          <Route exact path={urls.advancesearch} element={<AdvanceSearch />} />
          <Route exact path="/:id" element={<ProfilePage />} />
          <Route
            exact
            path={urls.preferencepage}
            element={<PreferencePage />}
          />
          <Route exact path={urls.myprofile} element={<MyProfile />} />
          <Route exact path={urls.setting} element={<Setting />} />
          <Route exact path={urls.notification} element={<Notification />} />
          <Route exact path={urls.register} element={<NewUser />} />
        </Route>
        <Route path="onetouchmatrimony/admin" element={<AdminHome />} />
        <Route path="onetouchmatrimony/admin/userSheet" element={<AdminUserSheet/> } />
        <Route path="onetouchmatrimony/:id" element={<ProfilePageAdmin />} />
        <Route path="members" element={<MembersPage />} />
        <Route path="onetouchmatrimony/alogin" element={<AdminLogin />} />
        <Route path="onetouchmatrimony/admin/memberSheet" element={<AdminMember/>} />
        <Route path="*" element={<Page404 />} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
