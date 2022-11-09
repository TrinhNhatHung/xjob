import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import "./Header.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Badge } from "@mui/material";
import Avatar from '@material-ui/core/Avatar';

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

  const redirectToSettings = (event)=> {
    event.preventDefault();
    navigate("/info");
  }  

  const logOut = (event)=> {
    event.preventDefault();
    // todo
  } 

  const getRoleFromResponseStr = ()=> {
    if (user.role !== null && user.role !== undefined){
      let result = user.role.substr(5).toLowerCase();
      result = result.charAt(0).toUpperCase() + result.substr(1);
      return result;
    }
  }

  const renderHeaderRight = () => {
    if (user.isAuthen) {
      return (
        <ul className="headerRight nav">
          <Badge className={"btnIcon"} badgeContent={""} color="error">
            <NotificationsNoneIcon className="headerIcon" fontSize="small" />
          </Badge>
          <div className="dropdown">
            <AccountCircleOutlinedIcon
              className="btnIcon headerIcon dropdown-toggle"
              data-bs-toggle="dropdown" 
              aria-expanded="false"
              fontSize="small"
            />
            <ul className="dropdown-menu">
              <Avatar className="avatar"/>
              <span className="userName">{user.firstName + " " + user.lastName}</span>
              <span className="role">{getRoleFromResponseStr()}</span>
              <li className="dropdown-item-li">
                <a className="dropdown-item" href="/info" onClick={redirectToSettings}>
                  Settings
                </a>
              </li>
              <li className="dropdown-item-li">
                <a className="dropdown-item" href="/" onClick={logOut}>
                  Log out
                </a>
              </li>
            </ul>
          </div>
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
          {renderHeaderRight()}
        </div>
      );
    } else {
      return <React.Fragment />;
    }
  };

  return render();
}

export default Header;
