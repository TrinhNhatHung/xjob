import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import "./Header.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Badge } from "@mui/material";
import Avatar from "@material-ui/core/Avatar";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import {BusinessConst} from "../../constant/BusinessConst";
import Notification from "../Notification/Notification";
import axiosRequiredAuthor from "../../api/axiosRequiredAuthor";
import {logout} from "../../reducer/userSlice";

function Header() {
  const user = useSelector((state) => state.user);
  const [notification, setNotification] = useState({
    page: 1,
    limit: 5,
    list: []
  });

  const [hasNotification, setHasNotification] = useState({
    status: false,
    content: null
  });

  if (user.isAuthen){
    var socket = new SockJS(BusinessConst.DOMAIN + "/notification");
    var stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      stompClient.subscribe("/topic/notifications/" + user.uid, function (message) {
        fetchNotifications();
        setHasNotification({
          status: true
        })
      });
    });
  }
  

  const fetchNotifications = ()=> {
    axiosRequiredAuthor.get(`/notification-list?page=${notification.page}&limit=${notification.limit}`)
      .then((response)=> {
        setNotification({
          ...notification,
          list: response.notifications
        })
      })
      .catch(()=> {
      });
  }

  useEffect(()=> {
    if (user.isAuthen){
      fetchNotifications();
    }
  },[user.isAuthen]);
  
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

  const redirectToSettings = (event) => {
    event.preventDefault();
    if (user.role === BusinessConst.ROLE_FREELANCER){
      navigate("/freelancer-info");
    } else {
      navigate("/client-info");
    }
  };

  const dispatch = useDispatch();
  const logOut = (event) => {
    event.preventDefault();
    dispatch(logout());
    navigate("/login");
    localStorage.removeItem("token");
  };

  const getRoleFromResponseStr = () => {
    if (user.role !== null && user.role !== undefined) {
      let result = user.role.substr(5).toLowerCase();
      result = result.charAt(0).toUpperCase() + result.substr(1);
      return result;
    }
  };

  const renderHeaderRight = () => {
    if (user.isAuthen) {
      return (
        <ul className="headerRight nav">
          <div className="dropdown">
            {
              hasNotification.status ? <Badge className="btnIcon dropdown-toggle" data-bs-toggle="dropdown" badgeContent="" color="error">
                <NotificationsNoneIcon className="headerIcon" fontSize="small" />
              </Badge>
              :
              <Badge className="btnIcon dropdown-toggle" data-bs-toggle="dropdown" color="error">
                <NotificationsNoneIcon className="headerIcon" fontSize="small" />
              </Badge>
            }
            <ul className="dropdown-menu notification">
              {
                notification.list.map((item,index)=> {
                  return <Notification key={index} notification={item}/>
                })
              }
              <div className="seeAllNotification">See All Notifications</div>
            </ul>
          </div>
          <div className="dropdown">
            <AccountCircleOutlinedIcon
              className="btnIcon headerIcon dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              fontSize="small"
            />
            <ul className="dropdown-menu">
              <Avatar className="avatar" />
              <span className="userName">
                {user.firstName + " " + user.lastName}
              </span>
              <span className="role">{getRoleFromResponseStr()}</span>
              <li className="dropdown-item-li">
                <a
                  className="dropdown-item"
                  href="/info"
                  onClick={redirectToSettings}
                >
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
