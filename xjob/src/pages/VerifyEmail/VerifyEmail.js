import React, { useState } from "react";
import "./verifyEmail.css";
import VerifyIcon from "../../images/verify_icon.svg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { auth } from "../../app/firebase_config";
import NotifyToast from "../../components/NotifyToast/NotifyToast";

function VerifyEmail() {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  useEffect(()=>{
    if (!user.isAuthen){
      navigate("/signup");
    }
  });

  const handleResendVerificationEmail = ()=> {
    auth.currentUser.sendEmailVerification().then(()=>{
      setNotify({
        ...notify,
        display: true,
        kind: "success",
        message: "New verification email is successfully sent. Please, check your email..."
      })
    }).catch(()=>{
    });  
  }

  const [notify, setNotify] = useState({
    display: false,
    kind: null,
    message: null
  })

  const handleRedirectToHome = (event)=> {
    event.preventDefault();
    navigate("/")
  }

  return (
    <div id="verifyPage">
      <a className="logo" href="/" onClick={handleRedirectToHome}>
        XJob
      </a>
      {
        notify.display ? <NotifyToast kind={notify.kind} message={notify.message} setNotify={setNotify} /> : <React.Fragment/>
      }
      <div id="controlVerify">
        <img className="verifyIcon" src={VerifyIcon} alt="" />
        <div className="title">Verify your email to proceed</div>
        <div className="message">
          We just sent an email to the address: <span className="emailAddress">{user.email}</span> <br />
          Please check your email and click on the link provided to verify your
          address.
        </div>
        <div className="btnGroup d-flex justify-content-center">
            <button className="btn resendBtn" onClick={handleResendVerificationEmail}>Resend Verification Email</button>
            <button className="btn redirectGmailInboxBtn">
                <a href="https://gmail.com" target="_blank" rel="noreferrer">Go to Gmail Inbox</a>
            </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
