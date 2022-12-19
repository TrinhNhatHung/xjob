import React, { useEffect } from "react";
import "./editJobDialog.css";
import Dialog from "@mui/material/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { closeJobDialog } from "../../reducer/editJobDialog";
import { useRef } from "react";
import { useState } from "react";
import { BusinessConst } from "../../constant/BusinessConst";
import SellIcon from "@mui/icons-material/Sell";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import Chip from "@mui/material/Chip";
import axiosClient from "../../api/axiosClient";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { setJobDialog } from "../../reducer/editJobDialog";
import { htmlToText, textToHtml } from "../../util/HtmlTagUtil";
import axiosRequiredAuthor from "../../api/axiosRequiredAuthor";

function EditJobDialog() {
  const jobDialog = useSelector((state) => state.jobDialog);
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState({});
  useEffect(() => {
    axiosClient
      .get("/skill/popular-skills")
      .then((response) => {
        let skills = [];
        response.skills.forEach((skill) => {
          skills = skills.concat({
            ...skill,
            label: skill.skillName,
          });
        });
        setSkills(skills);
      })
      .catch(() => {});
  }, []);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeJobDialog());
    setError({
      title: null,
      detail: null,
      skills: null,
      price: null,
      termTo: null,
      termFrom: null,
      hourPerWeek: null
    })
  };

  const changeInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    dispatch(
      setJobDialog({
        job: {
          ...jobDialog.job,
          [name]: value,
        },
      })
    );
  };

  const titleRef = useRef();
  const hourPerWeekRef = useRef();
  const termToRef = useRef();
  const termFromRef = useRef();
  const priceRef = useRef();
  const skillsRef = useRef();
  const detailRef = useRef();

  const handleUpdateJob = () => {
    titleRef.current.classList.remove("borderError");
    detailRef.current.classList.remove("borderError");
    skillsRef.current.classList.remove("borderError");
    priceRef.current.classList.remove("borderError");
    if (jobDialog.job.paymentKind === BusinessConst.PAYMENT_KIND_HOURLY) {
      termToRef.current.classList.remove("borderError");
      termFromRef.current.classList.remove("borderError");
      hourPerWeekRef.current.classList.remove("borderError");
    }
    var validate = true;

    let titleCheck = null;
    if (
      jobDialog.job.title === null ||
      jobDialog.job.title === undefined ||
      jobDialog.job.title === ""
    ) {
      validate = false;
      titleRef.current.classList.add("borderError");
      titleCheck = "Bắt buộc";
    }

    let detailCheck = null;
    if (
      jobDialog.job.detail === null ||
      jobDialog.job.detail === undefined ||
      jobDialog.job.detail === ""
    ) {
      validate = false;
      detailRef.current.classList.add("borderError");
      detailCheck = "Bắt buộc";
    }

    let skillsCheck = null;
    if (jobDialog.job.skills.length === 0) {
      validate = false;
      skillsRef.current.classList.add("borderError");
      skillsCheck = "Ít nhất 1 kĩ năng";
    }

    let priceCheck = null;
    if (
      jobDialog.job.price === null ||
      jobDialog.job.price === undefined ||
      jobDialog.job.price === ""
    ) {
      validate = false;
      priceRef.current.classList.add("borderError");
      if (
        jobDialog.job.paymentKind === BusinessConst.PAYMENT_KIND_FIXED_PRICE
      ) {
        priceCheck = "Bắt buộc";
      } else {
        priceCheck = "Bắt buộc";
      }
    }

    let termFromCheck = null;
    let termToCheck = null;
    let hourPerWeekCheck = null;

    if (jobDialog.job.paymentKind === BusinessConst.PAYMENT_KIND_HOURLY) {
      if (
        jobDialog.job.termFrom === null ||
        jobDialog.job.termFrom === undefined ||
        jobDialog.job.termFrom === ""
      ) {
        validate = false;
        termFromRef.current.classList.add("borderError");
        termFromCheck = "Bắt buộc";
      }

      if (
        jobDialog.job.termTo === null ||
        jobDialog.job.termTo === undefined ||
        jobDialog.job.termTo === ""
      ) {
        validate = false;
        termToRef.current.classList.add("borderError");
        termToCheck = "Bắt buộc";
      }

      if (
        jobDialog.job.hourPerWeek === null ||
        jobDialog.job.hourPerWeek === undefined ||
        jobDialog.job.hourPerWeek === ""
      ) {
        validate = false;
        hourPerWeekRef.current.classList.add("borderError");
        hourPerWeekCheck = "Bắt buộc";
      }
    }

    setError({
      ...error,
      title: titleCheck,
      detail: detailCheck,
      skills: skillsCheck,
      price: priceCheck,
      termTo: termToCheck,
      termFrom: termFromCheck,
      hourPerWeek: hourPerWeekCheck
    });

    if (validate){
      axiosRequiredAuthor
        .post("/job/update-job", null, {
          params: {
            jobId: jobDialog.job.jobId,
            title:jobDialog.job.title,
            detail:textToHtml(jobDialog.job.detail),
            paymentKind:jobDialog.job.paymentKind,
            price:jobDialog.job.price,
            termClass:jobDialog.job.termClass,
            termFrom:jobDialog.job.termFrom,
            termTo:jobDialog.job.termTo,
            hourPerWeek:jobDialog.job.hourPerWeek,
            skills:JSON.stringify(jobDialog.job.skills) 
          }
        })
        .then((response) => {
          handleClose();
          window.location.reload();
        })
        .catch(() => {
          alert("Đã xảy ra lỗi không thể cập nhật");
        });
    }
  };

  const addSkill = (event) => {
    let innerHtml = event.target.innerHTML;
    let id = event.target.id;
    if (id !== null && id !== undefined) {
      id = parseInt(id.substr(id.lastIndexOf("-") + 1)) + 1;
    }
    let arr = jobDialog.job.skills;
    let check = arr.map((e) => e.skillId).includes(id);
    if (!check) {
      arr = arr.concat({
        skillId: id,
        skillName: innerHtml,
      });
    }
    dispatch(
      setJobDialog({
        job: {
          ...jobDialog.job,
          skills: arr,
        },
      })
    );
  };

  const removeSelectedSkill = (skill) => {
    let arr = jobDialog.job.skills;
    arr = arr.filter((e) => {
      return e.skillId !== skill.skillId;
    });
    dispatch(
      setJobDialog({
        job: {
          ...jobDialog.job,
          skills: arr,
        },
      })
    );
  };

  const changeFixedPrice = () => {
    dispatch(
      setJobDialog({
        job: {
          ...jobDialog.job,
          paymentKind: BusinessConst.PAYMENT_KIND_FIXED_PRICE,
        },
      })
    );
  };

  const changeHourlyRate = () => {
    dispatch(
      setJobDialog({
        job: {
          ...jobDialog.job,
          paymentKind: BusinessConst.PAYMENT_KIND_HOURLY,
        },
      })
    );
  };

  return (
    <Dialog
      classes={{
        paper: "editJobDialog",
      }}
      fullWidth={true}
      open={jobDialog.isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="formItem mt-3">
        <label className="formItemLabel" htmlFor="title">
          Tiêu đề
        </label>
        <input
          id="title"
          ref={titleRef}
          className="formItemInput"
          name="title"
          type="text"
          onChange={changeInput}
          value={jobDialog.job.title}
        />
        <span className="errorInput">{error.title}</span>
      </div>
      <div className="formItem">
        <label className="formItemLabel" htmlFor="detail">
          Mô tả về công việc
        </label>
        <textarea
          id="detail"
          ref={detailRef}
          className="formItemInput"
          name="detail"
          type="text"
          onChange={changeInput}
          value={
            jobDialog.job.detail !== undefined
              ? htmlToText(jobDialog.job.detail)
              : ""
          }
        />
        <span className="errorInput">{error.detail}</span>
      </div>
      <br />
      <div className="formItem">
        <label className="formItemLabel" htmlFor="skills">
          Thêm kĩ năng
        </label>
        <Autocomplete
          ref={skillsRef}
          disablePortal
          id="combo-box-demo"
          options={skills}
          renderInput={(params) => <TextField {...params} />}
          clearOnBlur={false}
          onChange={addSkill}
        />
        <span className="errorInput">{error.skills}</span>
        {jobDialog.job.skills.length > 0 ? (
          <div>
            <div className="formItemLabel subLabel mt-2">Kĩ năng đã chọn</div>
            <div className="skills selectedSkills">
              {jobDialog.job.skills.map((skill, index) => {
                return (
                  <Chip
                    key={index}
                    className="skill selectedSkill"
                    label={skill.skillName}
                    onDelete={() => removeSelectedSkill(skill)}
                    deleteIcon={<CloseIcon />}
                    variant="outlined"
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <React.Fragment />
        )}
      </div>
      <div className="formItem">
        <label className="formItemLabel" htmlFor="">
          Ngân sách
        </label>
        <div className="d-flex">
          <div
            className={
              "paymentKind d-flex flex-row " +
              (jobDialog.job.paymentKind ===
              BusinessConst.PAYMENT_KIND_FIXED_PRICE
                ? "active"
                : "")
            }
            onClick={changeFixedPrice}
          >
            <div className="d-flex flex-column">
              <SellIcon className="icon" />
              <label className="label" htmlFor="paymentKind_fixedPrice">
                Cố định
              </label>
            </div>
            <input
              id="paymentKind_fixedPrice"
              className="paymentKindRadio"
              type="radio"
              name="paymentKind"
              value="1"
              checked={
                jobDialog.job.paymentKind ===
                BusinessConst.PAYMENT_KIND_FIXED_PRICE
              }
            />
          </div>
          <div
            className={
              "paymentKind d-flex flex-row " +
              (jobDialog.job.paymentKind === BusinessConst.PAYMENT_KIND_HOURLY
                ? "active"
                : "")
            }
            onClick={changeHourlyRate}
          >
            <div className="d-flex flex-column">
              <AccessTimeIcon className="icon" />
              <label className="label" htmlFor="paymentKind_hourly">
                Theo giờ
              </label>
            </div>
            <input
              id="paymentKind_hourly"
              className="paymentKindRadio"
              type="radio"
              name="paymentKind"
              value="2"
              checked={
                jobDialog.job.paymentKind === BusinessConst.PAYMENT_KIND_HOURLY
              }
            />
          </div>
        </div>
        <div className="price mt-3">
          <label htmlFor="price">
            {jobDialog.job.paymentKind ===
            BusinessConst.PAYMENT_KIND_FIXED_PRICE
              ? "Giá cố định"
              : "Giá theo giờ"}
          </label>
          <input
            ref={priceRef}
            id="price"
            type="number"
            min={0}
            name="price"
            className="formItemInput"
            onChange={changeInput}
            value={jobDialog.job.price}
          />
          <span className="currency">VND</span>
        </div>
        <span className="errorInput">{error.price}</span>
      </div>
      {jobDialog.job.paymentKind === BusinessConst.PAYMENT_KIND_HOURLY ? (
        <div className="formItem">
          <label className="formItemLabel mb-3" htmlFor="">
            Thời gian có thể kéo dài trong khoảng ?
          </label>
          <div className="row">
            <div className="col d-flex flex-column">
              <label id="termLabel" htmlFor="termClass">
                Khoảng thời gian
              </label>
              <select
                id="termClass"
                name="termClass"
                className="formItemInput termClass mb-3"
                onChange={changeInput}
              >
                <option value={BusinessConst.TERM_CLASS_YEAR}>Year</option>
                <option value={BusinessConst.TERM_CLASS_MONTH}>Month</option>
                <option value={BusinessConst.TERM_CLASS_WEEK}>Week</option>
                <option value={BusinessConst.TERM_CLASS_DAY}>Day</option>
              </select>
            </div>
            <div className="col d-flex flex-column">
              <label id="termLabel" htmlFor="termFrom">
                Từ
              </label>
              <input
                ref={termFromRef}
                id="termFrom"
                className="formItemInput"
                name="termFrom"
                type="number"
                min={0}
                onChange={changeInput}
                value={jobDialog.job.termFrom}
              />
              <span className="errorInput">{error.termFrom}</span>
            </div>
            <div className="col d-flex flex-column">
              <label id="termLabel" htmlFor="termTo">
                Tới
              </label>
              <input
                ref={termToRef}
                id="termTo"
                className="formItemInput"
                name="termTo"
                type="number"
                min={0}
                onChange={changeInput}
                value={jobDialog.job.termTo}
              />
              <span className="errorInput">{error.termTo}</span>
            </div>
            <div className="col d-flex flex-column">
              <label id="termLabel" htmlFor="hourPerWeek">
                Giờ/Tuần
              </label>
              <input
                ref={hourPerWeekRef}
                id="hourPerWeek"
                type="number"
                min={0}
                name="hourPerWeek"
                className="formItemInput hourPerWeek"
                onChange={changeInput}
                value={jobDialog.job.hourPerWeek}
              />
              <span className="errorInput">{error.hourPerWeek}</span>
            </div>
          </div>
        </div>
      ) : (
        <React.Fragment />
      )}
      <div>
        <button className="btn backBtn m-2" onClick={handleClose}>
          Huỷ
        </button>
        <button className="btn postJob m-2" onClick={handleUpdateJob}>
          Cập nhật
        </button>
      </div>
    </Dialog>
  );
}

export default EditJobDialog;
