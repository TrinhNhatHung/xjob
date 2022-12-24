import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axiosRequiredAuthor from "../../api/axiosRequiredAuthor";
import MyJobElement from "../../components/MyJob/MyJobElement";
import { BusinessConst } from "../../constant/BusinessConst";
import "./myJob.css";

function MyJob() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      axiosRequiredAuthor
      .get(`/job/my-job`)
      .then((response) => {
        setJobs(response.jobs);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          navigate("/login");
        }
      });
  }, []);
  
  const calInfoOfPost = (post)=> {
    let result = "";
    let hourPerWeek = post.hourPerWeek;
    let paymentKind = post.paymentKind;
    let termClass = post.termClass;
    let termFrom = post.termFrom;
    let termTo = post.termTo;
    let price = post.price;
    if (paymentKind === BusinessConst.PAYMENT_KIND_FIXED_PRICE){
      result += "Giá cố định";
      result += ` - Est. Ngân sách:${price} VND`;
    } else {
      result += `Giá theo giờ:${price} VND`;
      let duration = "ngày";
      if (termClass === BusinessConst.TERM_CLASS_YEAR){
        duration = "năm";
      } else if (termClass === BusinessConst.TERM_CLASS_MONTH){
        duration = "tháng";
      } else if (termClass === BusinessConst.TERM_CLASS_WEEK){
        duration = "tuần";
      }
      result += ` - Est. Thời gian:${termFrom} tới ${termTo} ${duration}, Khoảng ${hourPerWeek} giờ/tuần`;
    }
    return result;
  }

  const handleLoadMore = ()=> {

  }
  return (
    <div id="myJobPage">
      <div className="jobs">
        <div className="jobsTitle">Công việc của bạn</div>
        {jobs.map((job, index) => {
          return (
            <MyJobElement
              key={index}
              info={calInfoOfPost(job)}
              job={job}
            />
          );
        })}
        <button onClick={handleLoadMore} className="loadMoreBtn">
          Xem thêm
        </button>
      </div>
    </div>
  );
}

export default MyJob;
