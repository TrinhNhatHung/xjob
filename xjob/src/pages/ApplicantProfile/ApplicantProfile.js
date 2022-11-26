import React, { useEffect, useState } from "react";
import "./applicantProfile.css";
import { Avatar, Chip } from "@mui/material";
import axiosRequireAuthor from "../../api/axiosRequiredAuthor";
import { useParams } from "react-router";

function ApplicantProfile() {
  const [info, setInfo] = useState({
    skills: [],
    experiences: [],
  });

  const { uid } = useParams();

  const fetchFreelancerInfo = () => {
    axiosRequireAuthor
      .get(`/user/freelancer-info?uid=${uid}`)
      .then((response) => {
        setInfo(response.freelancerInfo);
      })
      .catch(() => {
        // todo
      });
  };

  useEffect(() => {
    fetchFreelancerInfo();
  }, []);

  const renderExperience = (experience) => {
    let title = experience.skillName;
    if (experience.companyName) {
      title += " | " + experience.companyName;
    }
    let time = experience.experienceFrom;
    if (experience.experienceTo) {
      time += " - " + experience.experienceTo;
    } else {
      time += " - nay";
    }
    return (
      <div className="experience">
        <div className="experienceTitle">
          <span>{title}</span>
        </div>
        <div className="experienceTime">
          <span>{time}</span>
        </div>
        <div
          className="experienceDes"
          dangerouslySetInnerHTML={{ __html: experience.detail }}
        ></div>
      </div>
    );
  };
  return (
    <div id="applicantProfilePage">
      <div className="freelancerBackground">
        <div className="header d-flex">
          <div className="avatar">
            <Avatar className="img" />
          </div>
          <div>
            <div className="name d-flex align-items-center">
              <span className="text">
                {info.firstName + " " + info.lastName}
              </span>
            </div>
            <span>{info.email}</span>
          </div>
        </div>
        <div className="d-flex">
          <div className="left">
            <div className="element">
              <div className="title d-flex">
                <span className="text">Chi phí một giờ</span>
              </div>
              <div className="content">
                <span>{info.hourlyRate + " VND"}</span>
              </div>
            </div>
            <div className="element">
              <div className="title d-flex">
                <span className="text">Ngôn ngữ</span>
              </div>
              <div className="content">
                <span></span>
              </div>
            </div>
            <div className="element">
              <div className="title d-flex">
                <span className="text">Học vấn</span>
              </div>
              <div className="content">
                <span></span>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="element intro">
              <div className="title d-flex">
                <span className="text">{info.mainSkill}</span>
              </div>
              <div
                className="introduce d-flex"
                dangerouslySetInnerHTML={{ __html: info.introduction }}
              ></div>
            </div>
            <div className="element skills">
              <div className="title d-flex">
                <span className="text">Kĩ năng</span>
              </div>
              <div className="skillChips">
                {info.skills.map((skill, index) => {
                  return (
                    <Chip
                      key={index}
                      className="skillChip"
                      label={skill.skillName}
                      clickable
                    />
                  );
                })}
              </div>
            </div>
            <div className="element employmentHistory">
              <div className="title d-flex">
                <span className="text">Kinh nghiệm làm việc</span>
              </div>
              <div className="content expriences">
                {info.experiences.map((experience) =>
                  renderExperience(experience)
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicantProfile;
