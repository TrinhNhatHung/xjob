import React from "react";
import "./yourPost.css";
import { BusinessConst } from "../../constant/BusinessConst";
import { useNavigate } from "react-router";

function YourPost(props) {

  const navigate = useNavigate();

  const handleClickPost = (event)=> {
    event.preventDefault();
    navigate(`/applicants/${props.post.jobId}/applicants`);
  }

  return (
    <div id="yourPost">
      <div className="yourPostTitle" onClick={handleClickPost}><a href={`/applicants/${props.post.jobId}/applicants`}>{props.post.title}</a></div>
      <div className="d-flex flec-row justify-content-between">
        <div className="info">
          {props.post.paymentKind === BusinessConst.PAYMENT_KIND_HOURLY
            ? "Giá theo giờ"
            : "Giá cố định"}
        </div>
        <div className="proposals d-flex flex-row">
          <div className="proposalInfo d-flex flex-column">
            <span className="value">{props.post.proposals}</span>
            <span className="label">Ứng tuyển</span>
          </div>
          <div className="proposalInfo d-flex flex-column">
            <span className="value">{props.post.hired}</span>
            <span className="label">Đã thuê</span>
          </div>
        </div>
      </div>
      <div className="statusArea">
        {
          props.post.status === "OPEN"? 
          <span className="status open">{props.post.status}</span> :
          <React.Fragment/>
        }
        {
          props.post.status === "COMPLETE"? 
          <span className="status complete">{props.post.status}</span> :
          <React.Fragment/>
        }
        {
          props.post.status === "CLOSE"? 
          <span className="status close">{props.post.status}</span> :
          <React.Fragment/>
        }
      </div>
    </div>
  );
}

export default YourPost;
