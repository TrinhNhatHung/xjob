import React, { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import "./dashboard.css";
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import GroupsIcon from '@mui/icons-material/Groups';
import { useEffect } from "react";
import axiosRequiredAuthor from "../../api/axiosRequiredAuthor";
function DashBoard() {
  const [data, setData] = useState({
    countJob: null,
    countFreelancer: null,
    countClient: null
  });
  useEffect(()=> {
    axiosRequiredAuthor.get("/common/dashboard")
    .then((response)=> {
        setData({
            ...data,
            countJob: response.countJob,
            countFreelancer: response.countFreelancer,
            countClient: response.countClient
        })
    })
    .catch(()=> {
        // todo
    })
  }, []);
  return (
    <div id="dashboardPage" className="d-flex">
      <div className="sidebar">
        <AdminSidebar />
      </div>
      <div className="content">
        <div className="row mt-5">
          <div className="col">
            <div className="item">
                <WorkIcon className="icon"/>
                <span className="label">Công việc</span>
                <span className="value">{data.countJob} công việc được đăng tải</span>
            </div>
          </div>
          <div className="col">
            <div className="item">
                <GroupsIcon className="icon"/>
                <span className="label">Freelancer</span>
                <span className="value">{data.countFreelancer} tài khoản</span>
            </div>
          </div>
          <div className="col">
            <div className="item">
                <BusinessIcon className="icon"/>
                <span className="label">Khách hàng</span>
                <span className="value">{data.countClient} tài khoản</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
