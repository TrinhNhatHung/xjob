import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
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
        token:response.data.token
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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
