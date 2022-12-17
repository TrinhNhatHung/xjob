import React, { useEffect, useRef, useState } from "react";
import "./jobPost.css";
import axiosClient from "../../api/axiosClient";
import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { BusinessConst } from "../../constant/BusinessConst";
import SellIcon from "@mui/icons-material/Sell";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router";
import axiosRequiredAuthor from "../../api/axiosRequiredAuthor";
import NotifyToast from "../../components/NotifyToast/NotifyToast";
import {textToHtml} from "../../util/HtmlTagUtil";

function JobPost() {
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  useEffect(() => {
    axiosClient
      .get("/skill/popular-skills")
      .then((response) => {
        setSkills(response.skills);
      })
      .catch(() => {});
  }, []);

  const handleAddSkill = (skill) => {
    let arr = selectedSkills;
    let check = arr.map((e) => e.skillId).includes(skill.skillId);
    if (!check) {
      arr = arr.concat(skill);
      setSelectedSkills(arr);
    }

    setInput({
      ...input,
      skills: arr,
    });

    arr = skills;
    arr = arr.filter((e) => {
      return e.skillId !== skill.skillId;
    });
    setSkills(arr);
  };

  const removeSelectedSkill = (skill) => {
    let arr = selectedSkills;
    arr = arr.filter((e) => {
      return e.skillId !== skill.skillId;
    });
    setSelectedSkills(arr);

    setInput({
      ...input,
      skills: arr,
    });

    arr = skills;
    let check = arr.map((e) => e.skillId).includes(skill.skillId);
    if (!check) {
      arr = arr.concat(skill);
      setSkills(arr);
    }
  };

  const [input, setInput] = useState({
    title: null,
    detail: null,
    paymentKind: BusinessConst.PAYMENT_KIND_FIXED_PRICE,
    price: null,
    termClass: BusinessConst.TERM_CLASS_YEAR,
    termFrom: null,
    termTo: null,
    hourPerWeek: null,
  });

  const changeHourlyRate = () => {
    setInput({
      ...input,
      paymentKind: BusinessConst.PAYMENT_KIND_HOURLY,
    });
  };

  const changeFixedPrice = () => {
    setInput({
      ...input,
      paymentKind: BusinessConst.PAYMENT_KIND_FIXED_PRICE,
    });
  };

  const changeInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const titleRef = useRef();
  const detailRef = useRef();
  const skillsRef = useRef();
  const priceRef = useRef();
  const termToRef = useRef();
  const termFromRef = useRef();
  const hourPerWeekRef = useRef();

  const [error, setError] = useState({
    title: null,
    detail: null,
    skills: null,
    price: null,
    termTo: null,
    termFrom: null,
    hourPerWeek: null,
  });

  const [notify, setNotify] = useState({
    display: false,
    kind: null,
    message: null
  });

  const handlePostJob = () => {
    titleRef.current.classList.remove("borderError");
    detailRef.current.classList.remove("borderError");
    skillsRef.current.classList.remove("borderError");
    priceRef.current.classList.remove("borderError");
    if (input.paymentKind === BusinessConst.PAYMENT_KIND_HOURLY){
      termToRef.current.classList.remove("borderError");
      termToRef.current.classList.remove("borderError");
      termFromRef.current.classList.remove("borderError");
      hourPerWeekRef.current.classList.remove("borderError");
    }
  
    var validate = true;

    let titleCheck = null;
    if (
      input.title === null ||
      input.title === undefined ||
      input.title === ""
    ) {
      validate = false;
      titleRef.current.classList.add("borderError");
      titleCheck = "Title is required";
    }

    let detailCheck = null;
    if (
      input.detail === null ||
      input.detail === undefined ||
      input.detail === ""
    ) {
      validate = false;
      detailRef.current.classList.add("borderError");
      detailCheck = "Detail is required";
    }

    let skillsCheck = null;
    if (selectedSkills.length === 0) {
      validate = false;
      skillsRef.current.classList.add("borderError");
      skillsCheck = "At least 1 skill";
    }

    let priceCheck = null;
    if (
      input.price === null ||
      input.price === undefined ||
      input.price === ""
    ) {
      validate = false;
      priceRef.current.classList.add("borderError");
      if (input.paymentKind === BusinessConst.PAYMENT_KIND_FIXED_PRICE) {
        priceCheck = "Fixed-price is required";
      } else {
        priceCheck = "Hourly rate is required";
      }
    }

    let termFromCheck = null;
    let termToCheck = null;
    let hourPerWeekCheck = null;

    if (input.paymentKind === BusinessConst.PAYMENT_KIND_HOURLY) {
      if (
        input.termFrom === null ||
        input.termFrom === undefined ||
        input.termFrom === ""
      ) {
        validate = false;
        termFromRef.current.classList.add("borderError");
        termFromCheck = "Term From is required";
      }

      if (
        input.termTo === null ||
        input.termTo === undefined ||
        input.termTo === ""
      ) {
        validate = false;
        termToRef.current.classList.add("borderError");
        termToCheck = "Term To is required";
      }

      if (
        input.hourPerWeek === null ||
        input.hourPerWeek === undefined ||
        input.hourPerWeek === ""
      ) {
        validate = false;
        hourPerWeekRef.current.classList.add("borderError");
        hourPerWeekCheck = "Hour/Week is required";
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
      hourPerWeek: hourPerWeekCheck,
    });

    if (validate) {
      var formData = new FormData();
      formData.append("title", input.title);
      formData.append("detail", textToHtml(input.detail));
      formData.append("paymentKind", input.paymentKind);
      formData.append("price", input.price);
      if (input.paymentKind === BusinessConst.PAYMENT_KIND_HOURLY) {
        formData.append("termClass", input.termClass);
        formData.append("termFrom", input.termFrom);
        formData.append("termTo", input.termTo);
        formData.append("hourPerWeek", input.hourPerWeek);
      }
      formData.append(
        "skills",
        selectedSkills.map((skill) => skill.skillName)
      );

      axiosRequiredAuthor
        .post("/job/post-job", formData)
        .then((response) => {
          navigate(`/applicants/${response.jobId}/job-detail`);
        })
        .catch(() => {
          setNotify({
            display:true,
            kind: "error",
            message: "Post a job failed"
          });
          window.scrollTo(0,0);
        });
    }
  };

  return (
    <div id="jobPostPage">
      {
        notify.display ? <NotifyToast kind={notify.kind} message={notify.message} setNotify={setNotify} /> : <React.Fragment/>
      }
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
        />
        <span className="errorInput">{error.detail}</span>
      </div>
      <br />
      <div className="formItem">
        <label className="formItemLabel" htmlFor="skills">
          Thêm kĩ năng
        </label>
        <input id="skills" ref={skillsRef} className="formItemInput" type="text" />
        <span className="errorInput">{error.skills}</span>
        {selectedSkills.length > 0 ? (
          <div>
            <div className="formItemLabel subLabel mt-2">Kĩ năng đã chọn</div>
            <div className="skills selectedSkills">
              {selectedSkills.map((skill, index) => {
                return (
                  <Chip
                    key={index}
                    className="skill selectedSkill"
                    label={skill.skillName}
                    onClick={() => removeSelectedSkill(skill)}
                    onDelete={() => {}}
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
        <span className="formItemLabel subLabel mt-2">Kĩ năng phổ biến</span>
        <div className="skills suggestSkills">
          {skills.map((skill, index) => {
            return (
              <Chip
                key={index}
                className="skill suggestSkill"
                label={skill.skillName}
                onClick={() => handleAddSkill(skill)}
                onDelete={() => {}}
                deleteIcon={<AddIcon />}
                variant="outlined"
              />
            );
          })}
        </div>
      </div>
      <div className="formItem">
        <label className="formItemLabel" htmlFor="">
          Ngân sách
        </label>
        <div className="d-flex">
          <div
            className={
              "paymentKind d-flex flex-row " +
              (input.paymentKind === BusinessConst.PAYMENT_KIND_FIXED_PRICE
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
              onChange={() => {}}
              checked={
                input.paymentKind === BusinessConst.PAYMENT_KIND_FIXED_PRICE
              }
            />
          </div>
          <div
            className={
              "paymentKind d-flex flex-row " +
              (input.paymentKind === BusinessConst.PAYMENT_KIND_HOURLY
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
              onChange={() => {}}
              checked={input.paymentKind === BusinessConst.PAYMENT_KIND_HOURLY}
            />
          </div>
        </div>
        <div className="price mt-3">
          <label htmlFor="price">
            {input.paymentKind === BusinessConst.PAYMENT_KIND_FIXED_PRICE
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
          />
          <span className="currency">VND</span>
        </div>
        <span className="errorInput">{error.price}</span>
      </div>
      {input.paymentKind === BusinessConst.PAYMENT_KIND_HOURLY ? (
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
              />
              <span className="errorInput">{error.hourPerWeek}</span>
            </div>
          </div>
        </div>
      ) : (
        <React.Fragment />
      )}
      <div>
        <button className="btn backBtn m-2" onClick={handleBack}>
          Quay về
        </button>
        <button className="btn postJob m-2" onClick={handlePostJob}>
          Đăng công việc
        </button>
      </div>
    </div>
  );
}

export default JobPost;
