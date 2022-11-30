import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Header from "./components/Header/Header";
import Signup from "./pages/SignUp/Signup";
import Login from "./pages/Login/Login";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import ClientDashboard from "./pages/ClientDashboard/ClientDashboard";
import VerifySuccess from "./pages/VerifySuccess/VerifySuccess";
import { useEffect } from "react";
import axiosRequiredAuthor from "./api/axiosRequiredAuthor";
import { useDispatch } from "react-redux";
import {login} from "./reducer/userSlice";
import FindWork from "./pages/FindWork/FindWork";
import Applicants from "./pages/Applicants/Applicants";
import JobDetail from "./pages/JobDetail/JobDetail";
import JobPost from "./pages/JobPost/JobPost";
import ProposalDialog from "./components/ProposalDialog/ProposalDialog";
import NoAuthen from "./pages/NoAuthen/NoAuthen";
import ClientInfo from "./pages/ClientInfo/ClientInfo";
import FreelancerInfo from "./pages/FreelancerInfo/FreelancerInfo";
import EditSkillDialog from "./components/EditSkillDialog/EditSkillDialog";
import ExperienceDialog from "./components/ExperienceDialog/ExperienceDialog";
import EditMainSkillDialog from "./components/EditProfileDialog/EditMainSkillDialog";
import EditNameDialog from "./components/EditProfileDialog/EditNameDialog";
import ApplicantProfile from "./pages/ApplicantProfile/ApplicantProfile";
import JobSearch from "./pages/JobSearch/JobSearch";
import HiringDialog from "./components/HiringDialog/HiringDialog";
import Hired from "./pages/Hired/Hired";

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    axiosRequiredAuthor.get("/user/remember-login",null,{})
    .then((response)=> {
      localStorage.setItem("token",response.data.token);
      dispatch(login({
        isAuthen: true,
        uid: response.data.uid,
        lastName: response.data.lastName,
        firstName: response.data.firstName,
        avatarUrl: response.data.avatarUrl,
        email:response.data.email,
        token:response.data.token,
        role:response.data.role
      }));
    })
    .catch(()=>{});
  },[dispatch]);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Header />} />
        </Routes>
        <div id="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup/verify-email" element={<VerifyEmail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/find-work" element={<FindWork />} />
            <Route path="/client/dashboard" element={<ClientDashboard />} />
            <Route path="/verify-success" element={<VerifySuccess />} />
            <Route path={`/applicants/:jobId/applicants`} element={<Applicants />} />
            <Route path={`/applicants/:jobId/job-detail`} element={<JobDetail />} />
            <Route path={`/applicants/:jobId/hired`} element={<Hired />} />
            <Route path={`/job-post`} element={<JobPost />} />
            <Route path={`/client-info`} element={<ClientInfo />} />
            <Route path={`/freelancer-info`} element={<FreelancerInfo />} />
            <Route path={`/applicant-profile/:uid`} element={<ApplicantProfile />} />
            <Route path={`/jobs/search`} element={<JobSearch />} />
            <Route path={`/no-authen`} element={<NoAuthen />} />
          </Routes>
        </div>
      </BrowserRouter>
      <EditSkillDialog/>
      <ExperienceDialog/>
      <EditMainSkillDialog/>
      <EditNameDialog/>
      <ProposalDialog/>
      <HiringDialog/>
    </div>
  );
}

export default App;
