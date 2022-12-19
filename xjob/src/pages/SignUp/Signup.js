import React, { useRef, useState } from "react";
import "./signUp.css";
import freelancerIcon from "../../images/freelancer_icon.svg";
import clientIcon from "../../images/client_icon.svg";
import { useNavigate } from "react-router";
import axiosClient from "../../api/axiosClient";
import BusinessConst from "../../app/constant";
import ErrorIcon from "@mui/icons-material/Error";
import { useDispatch } from "react-redux";
import {signup} from '../../reducer/userSlice';

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
      emailCheck = "Email đã tồn tại";
    }

    let passwordCheck = null;
    if (input.password === null || input.password === undefined || input.password === "" ){
      validateLogin = false;
      passwordInput.current.classList.add("borderError");
      passwordCheck = "Mặt khẩu là bắt buộc";
    }

    let firstNameCheck = null;
    if (input.firstName === null || input.firstName === undefined || input.firstName === "" ){
      validateLogin = false;
      firstNameInput.current.classList.add("borderError");
      firstNameCheck = "Tên là bắt buộc";
    }

    let lastNameCheck = null;
    if (input.lastName === null || input.lastName === undefined || input.lastName === "" ){
      validateLogin = false;
      lastNameInput.current.classList.add("borderError");
      lastNameCheck = "Họ là bắt buộc";
    }

    setErrorInput({
      email: emailCheck,
      password: passwordCheck,
      lastName: lastNameCheck,
      firstName: firstNameCheck
    })

    if (validateLogin){
        axiosClient
          .post("/user/signup", null, {
            params : {
              firstName: input.firstName,
              lastName: input.lastName,
              email: input.email,
              password: input.password,
              role: selectedRole
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
              
              navigate("/login");
            } else {
              setErrorInput({
                ...errorInput,
                password: "Email đã tồn tại"
              });
            }
          })
          .catch(function (err) {
            setErrorInput({
              ...errorInput,
              password: "Đăng ký thất bại"
            });
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
              Tham gia để trở thành khách hàng hay freelancer
            </span>
            <div className="roles d-flex justify-content-center">
              <div
                ref={clientDiv}
                className="role client selectedRole"
                onClick={togglClientRole}
              >
                <img className="roleIcon" src={clientIcon} alt="" />
                <span>Tôi là khách hàng, tìm kiếm ứng viên cho dự án</span>
              </div>
              <div
                ref={freelancerDiv}
                className="role freelancer"
                onClick={toggleFreelancerRole}
              >
                <img className="roleIcon" src={freelancerIcon} alt="" />
                <span>Tôi là freelancer, tìm kiếm công việc</span>
              </div>
            </div>
            <button
              ref={createAccBtn}
              className="btn creAccBtn"
              onClick={handleCreateAcc}
            >
              Tạo tài khoản
            </button>
            <div className="login mt-4">
              <span>Đã có tài khoản?</span>
              <a onClick={navigateToLoginPage} href="/login">
                Đăng nhập
              </a>
            </div>
          </div>
        </div>
      );
    } else {
      let title = "";
      if (selectedRole === BusinessConst.ROLE_CLIENT) {
        title = "Đăng kí để tìm kiếm ứng viên";
      } else {
        title = "Đăng kí để tìm kiếm công việc";
      }
      return (
        <div id="signUpPage">
          <a className="logo" href="/" onClick={handleRedirectToHome}>
            XJob
          </a>
          <div className="switchRole">
            <span className={"text"}>
              {selectedRole === BusinessConst.ROLE_CLIENT
                ? "Để tìm kiếm công việc? "
                : "Để tìm kiếm ứng viên?"}
            </span>
            <span onClick={switchRole} className={"switchText"}>
              {selectedRole === BusinessConst.ROLE_CLIENT
                ? "Đăng kí trở thành freelancer "
                : "Đăng kí trở thành khách hàng"}
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
                  placeholder="Tên"
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
                  placeholder="Họ"
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
                placeholder="Mật khẩu"
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
              Tạo tài khoản
            </button>
            <div className="login">
              <span>Đã có tài khoản ?</span>
              <a onClick={navigateToLoginPage} href="/login">
                Đăng nhập
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
