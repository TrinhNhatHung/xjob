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
        message: "Một email xác nhận mới đã được gửi. Vui lòng kiểm tra email của bạn..."
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
        <div className="title">Xác nhận email của bạn để tiếp tục</div>
        <div className="message">
          Chúng tôi vừa gửi email tới địa chỉ: <span className="emailAddress">{user.email}</span> <br />
          Vui lòng kiểm tra email và  click vào link được cung cấp để xác nhận địa chỉ email của bạn.
        </div>
        <div className="btnGroup d-flex justify-content-center">
            <button className="btn resendBtn" onClick={handleResendVerificationEmail}>Gửi lại Email xác nhận</button>
            <button className="btn redirectGmailInboxBtn">
                <a href="https://gmail.com" target="_blank" rel="noreferrer">Chuyển tới hộp thoại Gmail</a>
            </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
