import React, { useRef, useState } from "react";
import "./signUp.css";
import freelancerIcon from "../../images/freelancer_icon.svg";
import clientIcon from "../../images/client_icon.svg";
import { useNavigate } from "react-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../app/firebase_config";
import axiosClient from "../../api/axiosClient";
import BusinessConst from "../../app/constant";
import ErrorIcon from "@mui/icons-material/Error";
import { useDispatch } from "react-redux";
import {signup} from '../../reducer/userSlice';
import randomCode from '../../util/RandomCode';
import axiosRequiredAuthor from "../../api/axiosRequiredAuthor";

function Signup() {
  const navigate = useNavigate();
  const navigateToLoginPage = (event) => {
    event.preventDefault();
    navigate("/login");
  };
  const [selectedRole, setSelectedRole] = useState(BusinessConst.ROLE_CLIENT);
  const clientDiv = useRef();
  const freelancerDiv = useRef();
  const createAccBtn = useRef();
  const togglClientRole = () => {
    if (selectedRole === BusinessConst.ROLE_CLIENT) {
      clientDiv.current.classList.remove("selectedRole");
      setSelectedRole(null);
      createAccBtn.current.setAttribute("disabled", true);
    } else {
      clientDiv.current.classList.add("selectedRole");
      freelancerDiv.current.classList.remove("selectedRole");
      setSelectedRole(BusinessConst.ROLE_CLIENT);
      createAccBtn.current.removeAttribute("disabled");
    }
  };

  const toggleFreelancerRole = () => {
    if (selectedRole === BusinessConst.ROLE_FREELANCER) {
      freelancerDiv.current.classList.remove("selectedRole");
      setSelectedRole(null);
      createAccBtn.current.setAttribute("disabled", true);
    } else {
      freelancerDiv.current.classList.add("selectedRole");
      clientDiv.current.classList.remove("selectedRole");
      setSelectedRole(BusinessConst.ROLE_FREELANCER);
      createAccBtn.current.removeAttribute("disabled");
    }
  };

  const switchRole = () => {
    if (selectedRole === BusinessConst.ROLE_CLIENT) {
      setSelectedRole(BusinessConst.ROLE_FREELANCER);
    } else {
      setSelectedRole(BusinessConst.ROLE_CLIENT);
    }
  };
  const handleCreateAcc = () => {
    setKind("FORM");
  };

  const [input, setInput] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
  });

  const [errorInput, setErrorInput] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
  });

  const handleChangeInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const firstNameInput =useRef();
  const lastNameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const dispatch = useDispatch();

  const signUpNewAccount = () => {
    firstNameInput.current.classList.remove("borderError");
    lastNameInput.current.classList.remove("borderError");
    emailInput.current.classList.remove("borderError");
    passwordInput.current.classList.remove("borderError");

    let validateLogin = true;

    let emailCheck = null;
    if (input.email === null || input.email === undefined || input.email === "" ){
      validateLogin = false;
      emailInput.current.classList.add("borderError");
      emailCheck = "Email is required";
    }

    let passwordCheck = null;
    if (input.password === null || input.password === undefined || input.password === "" ){
      validateLogin = false;
      passwordInput.current.classList.add("borderError");
      passwordCheck = "Password is required";
    }

    let firstNameCheck = null;
    if (input.firstName === null || input.firstName === undefined || input.firstName === "" ){
      validateLogin = false;
      firstNameInput.current.classList.add("borderError");
      firstNameCheck = "First name is required";
    }

    let lastNameCheck = null;
    if (input.lastName === null || input.lastName === undefined || input.lastName === "" ){
      validateLogin = false;
      lastNameInput.current.classList.add("borderError");
      lastNameCheck = "Last name is required";
    }

    setErrorInput({
      email: emailCheck,
      password: passwordCheck,
      lastName: lastNameCheck,
      firstName: firstNameCheck
    })

    if (validateLogin){
      createUserWithEmailAndPassword(auth, input.email, input.password)
      .then((userCredential) => {
        let uid = userCredential.user.uid;
        axiosClient
          .post("/user/signup", null, {
            params : {
              uid,
              firstName: input.firstName,
              lastName: input.lastName,
              email: input.email,
              password: input.password,
              role: selectedRole,
            }
          })
          .then(function (response) {
            if (response.data.isSuccess){
              localStorage.setItem("token",response.data.token);
              dispatch(signup({
                isAuthen: true,
                uid:response.data.uid,
                lastName:response.data.lastName,
                firstName: response.data.firstName,
                email: response.data.email,
                avatarUrl: response.data.avatarUrl,
                token:response.data.token,
                role:response.data.role
              }))
              let verifyCode = randomCode(5);
              axiosRequiredAuthor.post("/user/update-verify-code",null,{
                params: {
                  verifyCode: verifyCode
                }
              }).catch(()=>{});
              let origin = window.location.origin;
              let actionCodeSetting = {
                url: `${origin}/verify-success?verifyCode=${verifyCode}`,
                handleCodeInApp: true
              };
              auth.currentUser.sendEmailVerification(actionCodeSetting).then(()=>{
              }).catch(()=>{
              });  
              navigate("/signup/verify-email");
            } else {
              setErrorInput({
                ...errorInput,
                password: "Email is existing"
              });
            }
          })
          .catch(function (err) {
            setErrorInput({
              ...errorInput,
              password: "Sign up failed ( System error )"
            });
          });
      })
      .catch((error) => {
        if(error.code === "auth/email-already-in-use"){
          setErrorInput({
            ...errorInput,
            password: "Email is existing"
          });
        } else if (error.code === "auth/weak-password"){
          setErrorInput({
            ...errorInput,
            password: "Password is so weak"
          });
        } else {
          setErrorInput({
            ...errorInput,
            password: "Sign up failed"
          });
        }
      });
    }
  };

  const handleRedirectToHome = (event)=> {
    event.preventDefault();
    navigate("/")
  }

  const [kind, setKind] = useState("SELECTED_ROLE");
  const renderPage = () => {
    if (kind === "SELECTED_ROLE") {
      return (
        <div id="signUpPage">
          <a className="logo" href="/" onClick={handleRedirectToHome}>
            XJob
          </a>
          <div id="selectRole">
            <span className="selectRoleTitle">
              Join as a client or freelancer
            </span>
            <div className="roles d-flex justify-content-center">
              <div
                ref={clientDiv}
                className="role client selectedRole"
                onClick={togglClientRole}
              >
                <img className="roleIcon" src={clientIcon} alt="" />
                <span>I’m a client, hiring for a project</span>
              </div>
              <div
                ref={freelancerDiv}
                className="role freelancer"
                onClick={toggleFreelancerRole}
              >
                <img className="roleIcon" src={freelancerIcon} alt="" />
                <span>I’m a freelancer, looking for work</span>
              </div>
            </div>
            <button
              ref={createAccBtn}
              className="btn creAccBtn"
              onClick={handleCreateAcc}
            >
              Create Account
            </button>
            <div className="login">
              <span>Already have an account?</span>
              <a onClick={navigateToLoginPage} href="/login">
                Login
              </a>
            </div>
          </div>
        </div>
      );
    } else {
      let title = "";
      if (selectedRole === BusinessConst.ROLE_CLIENT) {
        title = "Sign up to hire talent";
      } else {
        title = "Sign up to find work";
      }
      return (
        <div id="signUpPage">
          <a className="logo" href="/" onClick={handleRedirectToHome}>
            XJob
          </a>
          <div className="switchRole">
            <span className={"text"}>
              {selectedRole === BusinessConst.ROLE_CLIENT
                ? "Looking for work? "
                : "Here to hire talent?"}
            </span>
            <span onClick={switchRole} className={"switchText"}>
              {selectedRole === BusinessConst.ROLE_CLIENT
                ? "Apply as talent "
                : "Join as a client"}
            </span>
          </div>
          <div id="signUpPageForm">
            <span className="formTitle">{title}</span>
            <div className="row">
              <div className="col mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="First name"
                  name="firstName"
                  onChange={handleChangeInput}
                  ref={firstNameInput}
                />
                {errorInput.firstName !== null ? (
                  <div className="errorSignup">
                    <ErrorIcon className="errorSignupIcon" />
                    <span>{errorInput.firstName}</span>
                  </div>
                ) : (
                  <React.Fragment />
                )}
              </div>
              <div className="col mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  placeholder="Last name"
                  onChange={handleChangeInput}
                  ref={lastNameInput}
                />
                {errorInput.lastName !== null ? (
                  <div className="errorSignup">
                    <ErrorIcon className="errorSignupIcon" />
                    <span>{errorInput.lastName}</span>
                  </div>
                ) : (
                  <React.Fragment />
                )}
              </div>
            </div>
            <div className="col mb-3">
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                placeholder="Email"
                onChange={handleChangeInput}
                ref={emailInput}
              />
              {errorInput.email !== null ? (
                <div className="errorSignup">
                  <ErrorIcon className="errorSignupIcon" />
                  <span>{errorInput.email}</span>
                </div>
              ) : (
                <React.Fragment />
              )}
            </div>
            <div className="col mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                onChange={handleChangeInput}
                ref={passwordInput}
              />
              {errorInput.password !== null ? (
                <div className="errorSignup">
                  <ErrorIcon className="errorSignupIcon" />
                  <span>{errorInput.password}</span>
                </div>
              ) : (
                <React.Fragment />
              )}
            </div>
            <button className="btn creAccBtn" onClick={signUpNewAccount}>
              Create my account
            </button>
            <div className="login">
              <span>Already have an account?</span>
              <a onClick={navigateToLoginPage} href="/login">
                Login
              </a>
            </div>
          </div>
        </div>
      );
    }
  };

  return renderPage();
}

export default Signup;
