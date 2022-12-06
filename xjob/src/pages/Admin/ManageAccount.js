import React, { useEffect, useState } from "react";
import "./dashboard.css";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import axiosRequiredAuthor from "../../api/axiosRequiredAuthor";
import { Avatar } from "@mui/material";
import { BusinessConst } from "../../constant/BusinessConst";

function ManageAccount() {
  const [accounts, setAccounts] = useState([]);
  const [page, setPage] = useState(1);
  const fetchAccounts = ()=> {
    axiosRequiredAuthor
      .get(`/user/accounts?page=${page}&limit=10`)
      .then((response) => {
        setAccounts(response.accounts);
      })
      .catch(() => {});
  }
  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleChangeStatus = (account)=> {
    let status = account.status;
    if (status){
        let decide =  window.confirm(`Bạn có chắc muốn vô hiệu hoá tài khoản ${account.email} không?`);
        if (decide){
            axiosRequiredAuthor.post("/user/toggle-account", null, {
                params : {
                    uid: account.uid,
                    status: !status
                }
            })
            .then(()=> {
                fetchAccounts();
            })
            .catch(()=> {
                alert("Thay đổi không thành công");
            })
        }
    } else {
        let decide =  window.confirm(`Bạn có chắc muốn mở lại tài khoản ${account.email} không?`);
        if (decide){
            axiosRequiredAuthor.post("/user/toggle-account", null, {
                params : {
                    uid: account.uid,
                    status: !status
                }
            })
            .then(()=> {
                fetchAccounts();
            })
            .catch(()=> {
                alert("Thay đổi không thành công");
            })
        }
    }

  }
  return (
    <div id="dashboardPage" className="d-flex">
      <div className="sidebar">
        <AdminSidebar />
      </div>
      <div className="content">
        {accounts.map((account, index) => {
          return (
            <div className="account d-flex justify-content-between align-items-center" key={index}>
              <div className="d-flex">
                <Avatar className="avatar" />
                <div className="d-flex flex-column align-items-start">
                  <div>
                    <span className="name">
                        {account.firstName + " " + account.lastName}
                    </span>
                    <span className="uid">{"  (" +account.uid + ")"}</span>
                  </div>
                  <span className="email">{account.email}</span>
                  <span className="role">{account.role === BusinessConst.ROLE_FREELANCER ? "Freelancer" : "Client"}</span>
                </div>
              </div>
              <div class="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  checked={account.status}
                  onChange={()=> handleChangeStatus(account)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ManageAccount;
