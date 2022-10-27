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
            ? "Hourly"
            : "Fixed-price"}
        </div>
        <div className="proposals d-flex flex-row">
          <div className="proposalInfo d-flex flex-column">
            <span className="value">{props.post.proposals}</span>
            <span className="label">Proposals</span>
          </div>
          <div className="proposalInfo d-flex flex-column">
            <span className="value">{props.post.hired}</span>
            <span className="label">Hired</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourPost;
