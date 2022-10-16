import React from "react";
import { useLocation, useNavigate } from "react-router";
import "./Header.css";
function Header() {

  const navigate = useNavigate();
  const handleNavigateLogin = (event)=> {
    event.preventDefault();
    navigate("/login");
  }

  const location = useLocation();

  const redirectToSignupPage = ()=> {
    navigate("/signup")
  }

  const render = ()=> {
    if (location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname !== "/signup/verify-email"){
      return <div id="header">
      <ul className="headerLeft nav">
        <li className="headerLogo nav-item">
          <a className="nav-link" href="/">
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
      <ul className="headerRight nav">
          <li className="nav-item">
            <a onClick={handleNavigateLogin} className="loginBtn nav-link" href="/login">
              Login
            </a>
          </li>
          <button className="btn signUpBtn" onClick={redirectToSignupPage}>Sign Up</button>
      </ul>
    </div>
    } else {
      return <React.Fragment/>
    }
  }

  return (
      render()
  );
}

export default Header;
