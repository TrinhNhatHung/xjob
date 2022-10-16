import React, { useRef, useState } from "react";
import "./login.css";
import ErrorIcon from "@mui/icons-material/Error";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../app/firebase_config";
import axiosClient from "../../api/axiosClient";

function Login() {
  const inputEmailDiv = useRef();
  const inputPasswordDiv = useRef();
  const [error, setError] = useState({
    email: null,
    password: null,
  });
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const requestCheckLogin = async (uid) => {
    let config = {
      method: "GET",
      url: `/user/check-login?uid=${uid}`,
    };
    axiosClient(config)
      .then((response) => {
        // todo
      })
      .catch((error) => {
        inputPasswordDiv.current.classList.add("borderError");
        setError({
          ...error,
          email: null,
          password: "Incorrect email or password",
        });
      });
  };
  const handleSignIn = () => {
    let emailCheck = null;
    inputEmailDiv.current.classList.remove("borderError");
    if (user.email === null || user.email === "" || user.email === undefined) {
      emailCheck = "A valid email is required";
      inputEmailDiv.current.classList.add("borderError");
    }

    let passwordCheck = null;
    inputPasswordDiv.current.classList.remove("borderError");
    if (
      user.password === null ||
      user.password === "" ||
      user.password === undefined
    ) {
      passwordCheck = "Password is required";
      inputPasswordDiv.current.classList.add("borderError");
    }

    setError({
      ...error,
      email: emailCheck,
      password: passwordCheck,
    });

    if (
      user.email !== null &&
      user.email !== "" &&
      user.email !== undefined &&
      user.password !== null &&
      user.password !== "" &&
      user.password !== undefined
    ) {
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          let uid = userCredential.user.uid;
          requestCheckLogin(uid);
        })
        .catch((error) => {
          inputEmailDiv.current.classList.add("borderError");
          inputPasswordDiv.current.classList.add("borderError");
          setError({
            ...error,
            email: null,
            password: "Incorrect email or password",
          });
        });
    }
  };

  const navigate = useNavigate();

  const navigateToSignUpPage = () => {
    navigate("/signup");
  };

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div id="loginPage">
      <a className="logo" href="/">
        XJob
      </a>
      <div id="selectAccount" className="d-flex flex-column align-items-center">
        <span className="loginFormTitle">Log in to XJob</span>
        <div ref={inputEmailDiv} className="email input-group mb-3">
          <span className="icon input-group-text">
            <PersonIcon />
          </span>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInputGroup1"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleInput}
            />
          </div>
        </div>
        {error.email !== null ? (
          <div className="errorLogin">
            <ErrorIcon className="errorLoginIcon" />
            <span>{error.email}</span>
          </div>
        ) : (
          <React.Fragment />
        )}
        <div ref={inputPasswordDiv} className="password input-group mb-3">
          <span className="icon input-group-text">
            <PasswordIcon />
          </span>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInputGroup1"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleInput}
            />
          </div>
        </div>
        {error.password !== null ? (
          <div className="errorLogin">
            <ErrorIcon className="errorLoginIcon" />
            <span>{error.password}</span>
          </div>
        ) : (
          <React.Fragment />
        )}
        <button className="btn loginBtn" onClick={handleSignIn}>
          <span>Continue with Email</span>
        </button>
        <div className="seperate">Don't have a XJob account ?</div>
        <button onClick={navigateToSignUpPage} className="btn signUpBtn">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Login;
