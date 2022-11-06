import { Chip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ApplicantHeader from "../../components/ApplicantHeader/ApplicantHeader";
import "./jobDetail.css";
import { BusinessConst } from "../../constant/BusinessConst";
import SellIcon from "@mui/icons-material/Sell";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import axiosRequireAuthor from "../../api/axiosRequiredAuthor";

function JobDetail() {
  const { jobId } = useParams();

  const [job, setJob] = useState({
    skills: [],
  });

  useEffect(() => {
    axiosRequireAuthor
      .get(`/job/job-detail?jobId=${jobId}`)
      .then((response) => {
        setJob(response.job);
      })
      .catch(() => {});
  }, [jobId]);

  const renderPostInfo = () => {
    let hourPerWeek = job.hourPerWeek;
    let paymentKind = job.paymentKind;
    let termClass = job.termClass;
    let termFrom = job.termFrom;
    let termTo = job.termTo;
    let price = job.price;
    if (paymentKind === BusinessConst.PAYMENT_KIND_FIXED_PRICE) {
      return (
        <div className="jobDetailInfo row">
          <div className="col-4 d-flex flex-row">
            <SellIcon className="icon" />
            <div>
              <div className="jobDetailInfoText">${price}</div>
              <div className="jobDetailInfoLabel">Fixed-price</div>
            </div>
          </div>
        </div>
      );
    } else {
      let duration = "days";
      if (termClass === BusinessConst.TERM_CLASS_YEAR) {
        duration = "years";
      } else if (termClass === BusinessConst.TERM_CLASS_MONTH) {
        duration = "months";
      } else if (termClass === BusinessConst.TERM_CLASS_WEEK) {
        duration = "weeks";
      }
      return (
        <div className="jobDetailInfo row">
          <div className="col-4 d-flex flex-row">
            <AccessTimeIcon className="icon" />
            <div>
              <div className="jobDetailInfoText">${price}</div>
              <div className="jobDetailInfoLabel">Hourly</div>
            </div>
          </div>
          <div className="col-4 d-flex flex-row">
            <CalendarMonthIcon className="icon" />
            <div>
              <div className="jobDetailInfoText">{`${termFrom} to ${termTo} ${duration}`}</div>
              <div className="jobDetailInfoLabel">Project Length</div>
            </div>
          </div>
          <div className="col-4 d-flex flex-row">
            <AccessAlarmIcon className="icon" />
            <div>
              <div className="jobDetailInfoText">{`Less than ${hourPerWeek} hrs/week`}</div>
              <div className="jobDetailInfoLabel">Hourly</div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div id="jobDetailPage">
      <ApplicantHeader jobId={jobId} />
      <div className="jobDetail d-flex flex-row">
        <div className="jobDetailContent">
          <div className="detailJobTitle">{job.title}</div>
          <div className="detailJobDetail">{job.detail}</div>
          {renderPostInfo()}
          <div className="skills d-flex flex-column">
            <span className="skillsTitle">Skills</span>
            <div>
              {job.skills.map((skill, index) => {
                return (
                  <Chip
                    key={index}
                    className="skill"
                    label={skill}
                    component="a"
                    href="#chip"
                    clickable
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="jobActions">
          <div className="jobAction">
            <EditIcon className="actionIcon" />
            <a className="actionText" href="/applicants/1/job-detail/edit">Edit Posting</a>
          </div>
          <div className="jobAction">
            <CloseIcon className="actionIcon"/>
            <a className="actionText" href="/applicants/1/job-detail/edit">Remove Posting</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetail;
