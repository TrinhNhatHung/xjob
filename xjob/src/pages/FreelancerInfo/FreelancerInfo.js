import React, { useEffect, useState } from "react";
import "./freelancerInfo.css";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosRequireAuthor from "../../api/axiosRequiredAuthor";
import { useDispatch } from "react-redux";
import { openSkillDialog } from "../../reducer/editSkillDialog";
import { openExperienceDialog } from "../../reducer/experienceDialog";
import { openProfileDialog } from "../../reducer/editProfileDialog";
import axiosRequiredAuthor from "../../api/axiosRequiredAuthor";

function FreelancerInfo() {
  const [info, setInfo] = useState({
    skills: [],
    experiences: [],
  });

  const fetchFreelancerInfo = ()=> {
    axiosRequireAuthor
      .get("/user/freelancer-info")
      .then((response) => {
        setInfo(response.freelancerInfo);
      })
      .catch(() => {
        // todo
    });
  }

  useEffect(() => {
    fetchFreelancerInfo();
  }, []);

  const openUpdateExperienceForm = (experience) => {
    dispatch(
      openExperienceDialog({
        experienceId: experience.experienceId,
        experience,
      })
    );
  };

  const deleteExperience = (experienceId) => {
    let result = window.confirm(
      "Bạn có chắc chắn muốn xoá kinh nghiệm làm việc này ?"
    );
    if (result) {
      axiosRequiredAuthor
        .post("/user/delete-freelancer-experience", null, {
          params: {
            experienceId,
          },
        })
        .then(() => {
          fetchFreelancerInfo();
        })
        .catch(() => {
          // todo
        });
    }
  };

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
          <div className="d-flex flex-row">
            <span
              className="icon"
              onClick={() => openUpdateExperienceForm(experience)}
            >
              <EditIcon className="iconSvg" />
            </span>
            <span
              className="icon mg-l-5"
              onClick={() => deleteExperience(experience.experienceId)}
            >
              <DeleteIcon className="iconSvg" />
            </span>
          </div>
        </div>
        <div className="experienceTime">
          <span>{time}</span>
        </div>
        <div className="experienceDes">
          <span>{experience.detail}</span>
        </div>
      </div>
    );
  };
  const dispatch = useDispatch();
  const openEditSkillDialog = () => {
    dispatch(openSkillDialog({ skills: info.skills }));
  };

  const openFormExperienceDialog = () => {
    dispatch(openExperienceDialog());
  };

  const openMainSkillDialog = () => {
    dispatch(
      openProfileDialog({
        kind: "MAIN_SKILL",
        mainSkill: info.mainSkill,
        introduction: info.introduction,
      })
    );
  };

  const openNameDialog = () => {
    dispatch(
      openProfileDialog({
        kind: "NAME",
        lastName: info.lastName,
        firstName: info.firstName,
        email: info.email,
      })
    );
  };

  return (
    <div id="freelancerInfoPage">
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
              <span className="icon" onClick={openNameDialog}>
                <EditIcon className="iconSvg" />
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
                <span className="icon">
                  <EditIcon className="iconSvg" />
                </span>
              </div>
              <div className="content">
                <span>{info.hourlyRate + " VND"}</span>
              </div>
            </div>
            <div className="element">
              <div className="title d-flex">
                <span className="text">Ngôn ngữ</span>
                <span className="icon">
                  <AddIcon className="iconSvg" />
                </span>
              </div>
              <div className="content">
                <span></span>
              </div>
            </div>
            <div className="element">
              <div className="title d-flex">
                <span className="text">Học vấn</span>
                <span className="icon">
                  <AddIcon className="iconSvg" />
                </span>
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
                <span className="icon" onClick={openMainSkillDialog}>
                  <EditIcon className="iconSvg" />
                </span>
              </div>
              <div className="introduce d-flex">
                <span className="text">{info.introduction}</span>
              </div>
            </div>
            <div className="element skills">
              <div className="title d-flex">
                <span className="text">Kĩ năng</span>
                <span className="icon" onClick={openEditSkillDialog}>
                  <EditIcon className="iconSvg" />
                </span>
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
                <span className="icon" onClick={openFormExperienceDialog}>
                  <AddIcon className="iconSvg" />
                </span>
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

export default FreelancerInfo;
