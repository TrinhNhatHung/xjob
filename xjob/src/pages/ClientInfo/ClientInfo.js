import React, { useEffect, useState } from "react";
import "./clientInfo.css";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar } from "@mui/material";
import axiosRequiredAuthor from "../../api/axiosRequiredAuthor";

function ClientInfo(props) {
  const [info,setInfo] = useState({});
  useEffect(()=> {
    axiosRequiredAuthor.get("/user/client-info")
    .then((response)=> {
        setInfo(response.clientInfo);
    })
    .catch(()=>{
        // todo
    });
  }, []);
  return (
    <div id="clientInfoPage">
      <div className="itemRow not-last">
        <div className="d-flex justify-content-between">
          <span className="title">Tài khoản</span>
          <span className="icon">
            <EditIcon className="iconSvg" />
          </span>
        </div>
        <div className="avatar">
          <Avatar className="img" />
        </div>
      </div>
      <div className="itemRow not-last">
        <div className="d-flex flex-column align-items-start">
          <span className="miniTitle">Công ty</span>
          <span className="content">{info.firstName}</span>
        </div>
        <div className="d-flex flex-column align-items-start mt-2">
          <span className="miniTitle">Email</span>
          <span className="content">{info.email}</span>
        </div>
      </div>
      <div className="itemRow">
        <div className="d-flex justify-content-between">
          <span className="title">Giới thiệu</span>
          <span className="icon">
            <EditIcon className="iconSvg" />
          </span>
        </div>
        <div className="content mt-2" dangerouslySetInnerHTML={{__html: info.introduction}}>
        </div>
      </div>
    </div>
  );
}

export default ClientInfo;
