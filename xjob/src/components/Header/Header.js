import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import "./Header.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Badge } from "@mui/material";

function Header() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleNavigateLogin = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  const location = useLocation();

  const redirectToSignupPage = () => {
    navigate("/signup");
  };

  const handleRedirectToHome = (event) => {
    event.preventDefault();
    navigate("/");
  };

  const renderHeaderRight = () => {
    if (user.isAuthen){
      return (
        <ul className="headerRight nav">
          <Badge className={"btnIcon"} badgeContent={""} color="error">
            <NotificationsNoneIcon className="headerIcon" fontSize="small" />
          </Badge>
          <AccountCircleOutlinedIcon className="btnIcon headerIcon" fontSize="small"/>
        </ul>
      );
    } else {
      return (
        <ul className="headerRight nav">
          <li className="nav-item">
            <a
              onClick={handleNavigateLogin}
              className="loginBtn nav-link"
              href="/login"
            >
              Login
            </a>
          </li>
          <button className="btn signUpBtn" onClick={redirectToSignupPage}>
            Sign Up
          </button>
        </ul>
      );
    }
    
  };

  const render = () => {
    if (
      location.pathname !== "/login" &&
      location.pathname !== "/signup" &&
      location.pathname !== "/signup/verify-email"
    ) {
      return (
        <div id="header">
          <ul className="headerLeft nav">
            <li className="headerLogo nav-item">
              <a className="nav-link" href="/" onClick={handleRedirectToHome}>
                XJob
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/find-talent">
                Find Talent
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/find-work">
                Find work
              </a>
            </li>
          </ul>
          {
            renderHeaderRight()
          }
        </div>
      );
    } else {
      return <React.Fragment />;
    }
  };

  return render();
}

export default Header;
