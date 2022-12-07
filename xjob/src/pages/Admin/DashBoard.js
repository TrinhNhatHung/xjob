import React, { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import "./dashboard.css";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import GroupsIcon from "@mui/icons-material/Groups";
import { useEffect } from "react";
import axiosRequiredAuthor from "../../api/axiosRequiredAuthor";
import { useRef } from "react";
import {
  Chart,
  registerables 
} from "chart.js";

Chart.register(...registerables);
let myChart = undefined;
function DashBoard() {
  const [data, setData] = useState({
    countJob: null,
    countFreelancer: null,
    countClient: null,
    mostSkill: []
  });
  const chartRef = useRef();

  useEffect(() => {
    axiosRequiredAuthor
      .get("/common/dashboard")
      .then((response) => {
        setData({
          ...data,
          countJob: response.countJob,
          countFreelancer: response.countFreelancer,
          countClient: response.countClient,
          mostSkill: response.mostSkill
        });
        if (myChart !== undefined) {
          myChart.destroy();
        }
      
        myChart = new Chart(chartRef.current.getContext('2d'), {
          type: "bar",
          data: {
            labels: response.mostSkill.map(item => item.skillName),
            datasets: [
              {
                label: "Số lượng công việc",
                data: response.mostSkill.map(item => item.count),
                borderWidth: 1,
                backgroundColor: ['rgba(20, 168, 0,0.1)'],
                borderColor: '#14a800'
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      })
      .catch(() => {
        // todo
      });
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
              <WorkIcon className="icon" />
              <span className="label">Công việc</span>
              <span className="value">
                {data.countJob} công việc được đăng tải
              </span>
            </div>
          </div>
          <div className="col">
            <div className="item">
              <GroupsIcon className="icon" />
              <span className="label">Freelancer</span>
              <span className="value">{data.countFreelancer} tài khoản</span>
            </div>
          </div>
          <div className="col">
            <div className="item">
              <BusinessIcon className="icon" />
              <span className="label">Khách hàng</span>
              <span className="value">{data.countClient} tài khoản</span>
            </div>
          </div>
        </div>
        <div className="chart">
          <canvas className="mt-3" ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
