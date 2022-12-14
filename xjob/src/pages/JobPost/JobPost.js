import React, { useEffect, useRef, useState } from "react";
import "./jobPost.css";
import axiosClient from "../../api/axiosClient";
import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";
import { BusinessConst } from "../../constant/BusinessConst";
import SellIcon from "@mui/icons-material/Sell";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router";
import axiosRequiredAuthor from "../../api/axiosRequiredAuthor";
import NotifyToast from "../../components/NotifyToast/NotifyToast";
import {textToHtml} from "../../util/HtmlTagUtil";
import { Autocomplete, TextField } from "@mui/material";

function JobPost() {
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
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

  const handleAddSkill = (event, value) => {
    let innerHtml = value.skillName;
    let id = value.skillId;
    let arr = selectedSkills;
    let check = arr.map((e) => e.skillId).includes(id);
    if (!check) {
      arr = arr.concat({
        skillId: id,
        skillName: innerHtml,
      });
      setSelectedSkills(arr);
    }

    setInput({
      ...input,
      skills: arr,
    });
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
      titleCheck = "B???t bu???c";
    }

    let detailCheck = null;
    if (
      input.detail === null ||
      input.detail === undefined ||
      input.detail === ""
    ) {
      validate = false;
      detailRef.current.classList.add("borderError");
      detailCheck = "B???t bu???c";
    }

    let skillsCheck = null;
    if (selectedSkills.length === 0) {
      validate = false;
      skillsRef.current.classList.add("borderError");
      skillsCheck = "??t nh???t 1 k?? n??ng";
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
        priceCheck = "B???t bu???c";
      } else {
        priceCheck = "B???t bu???c";
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
        termFromCheck = "B???t bu???c";
      }

      if (
        input.termTo === null ||
        input.termTo === undefined ||
        input.termTo === ""
      ) {
        validate = false;
        termToRef.current.classList.add("borderError");
        termToCheck = "B???t bu???c";
      }

      if (
        input.hourPerWeek === null ||
        input.hourPerWeek === undefined ||
        input.hourPerWeek === ""
      ) {
        validate = false;
        hourPerWeekRef.current.classList.add("borderError");
        hourPerWeekCheck = "B???t bu???c";
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
      axiosRequiredAuthor
        .post("/job/post-job", null, {
          params: {
            title:input.title,
            detail:textToHtml(input.detail),
            paymentKind:input.paymentKind,
            price:input.price,
            termClass:input.termClass,
            termFrom:input.termFrom,
            termTo:input.termTo,
            hourPerWeek:input.hourPerWeek,
            skills:JSON.stringify(selectedSkills)
          }
        })
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
          Ti??u ?????
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
          M?? t??? v??? c??ng vi???c
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
          Th??m k?? n??ng
        </label>
        <Autocomplete
          ref={skillsRef}
          disablePortal
          id="combo-box-demo"
          options={skills}
          renderInput={(params) => <TextField {...params} />}
          clearOnBlur={true}
          onChange={handleAddSkill}
        />
        <span className="errorInput">{error.skills}</span>
        {selectedSkills.length > 0 ? (
          <div>
            <div className="formItemLabel subLabel mt-2">K?? n??ng ???? ch???n</div>
            <div className="skills selectedSkills">
              {selectedSkills.map((skill, index) => {
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
          Ng??n s??ch
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
                C??? ?????nh
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
                Theo gi???
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
              ? "Gi?? c??? ?????nh"
              : "Gi?? theo gi???"}
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
            Th???i gian c?? th??? k??o d??i trong kho???ng ?
          </label>
          <div className="row">
            <div className="col d-flex flex-column">
              <label id="termLabel" htmlFor="termClass">
                Kho???ng th???i gian
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
                T???
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
                T???i
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
                Gi???/Tu???n
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
          Quay v???
        </button>
        <button className="btn postJob m-2" onClick={handlePostJob}>
          ????ng c??ng vi???c
        </button>
      </div>
    </div>
  );
}

export default JobPost;
