import React, { useRef, useState } from "react";
import "./experienceDialog.css"
import Dialog from "@mui/material/Dialog";
import { useDispatch, useSelector } from "react-redux";
import {closeExperienceDialog, setExperience} from "../../reducer/experienceDialog";
import axiosRequiredAuthor from "../../api/axiosRequiredAuthor";

function ExperienceDialog() {
  const { isOpen, experienceId, experience} = useSelector((state) => state.experienceDialog);
  const [error,setError] = useState({
    skillName: null,
    companyName: null,
    detail: null,
    experienceFrom: null,
    experienceTo: null
  });
  const dispatch = useDispatch();
  const handleClose = () => {
    companyNameRef.current.classList.remove("borderError");
    skillNameRef.current.classList.remove("borderError");
    experienceFromRef.current.classList.remove("borderError");
    experienceToRef.current.classList.remove("borderError");
    detailRef.current.classList.remove("borderError");
    setError({
      skillName: null,
      companyName: null,
      detail: null,
      experienceFrom: null,
      experienceTo: null
    });
    dispatch(closeExperienceDialog());
  };

  const onChangeInput = (event)=> {
    let name = event.target.name;
    let value = event.target.value;
    let newExperience = {
        ...experience,
        [name]: value
    };
    dispatch(setExperience({experience: newExperience}));
  }

  const companyNameRef = useRef();
  const skillNameRef = useRef();
  const experienceFromRef = useRef();
  const experienceToRef= useRef();
  const detailRef = useRef();

  const saveExperience = ()=> {

    companyNameRef.current.classList.remove("borderError");
    skillNameRef.current.classList.remove("borderError");
    experienceFromRef.current.classList.remove("borderError");
    experienceToRef.current.classList.remove("borderError");
    detailRef.current.classList.remove("borderError");

    let validate = true;
    let skillNameCheck = null;
    if (experience.skillName === null || experience.skillName === undefined || experience.skillName === "" ){
      skillNameCheck = "Chức danh là bắt buộc";
      skillNameRef.current.classList.add("borderError");
      validate = false;
    }

    let companyNameCheck = null;
    if (experience.companyName === null || experience.companyName === undefined || experience.companyName === "" ){
      companyNameCheck = "Chức danh là bắt buộc";
      companyNameRef.current.classList.add("borderError");
      validate = false;
    }

    let experienceFromCheck = null;
    if (experience.experienceFrom === null || experience.experienceFrom === undefined || experience.experienceFrom === "" ){
      experienceFromCheck = "Bắt đầu làm việc từ lúc nào là bắt buộc";
      experienceFromRef.current.classList.add("borderError");
      validate = false;
    }

    setError({
      ...error,
      skillName: skillNameCheck,
      companyName: companyNameCheck,
      experienceFrom : experienceFromCheck
    })

    if (validate){
      axiosRequiredAuthor.post("/user/update-freelancer-experience", null, {
        params : experience
      })
      .then(()=> {
        dispatch(closeExperienceDialog());
        window.location.reload();
      })
        .catch((error)=> {
      });
    }
    
  }

  return (
    <Dialog
      classes={{
        paper: "experienceForm",
      }}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
        <div className="formTitle">
            {
                experienceId === null ? "Thêm kinh nghiệm làm việc" : "Cập nhật kinh nghiệm làm việc"
            }
        </div>
        <div className="form-item">
            <label htmlFor="" className="form-item-label">Công ty</label>
            <input 
                type="text" className="form-item-input" 
                name="companyName"
                value={experience.companyName}
                onChange={onChangeInput}
                ref={companyNameRef}
            />
            <span className="error">{error.companyName}</span>
        </div>
        <div className="form-item">
            <label htmlFor="" className="form-item-label">Chức danh</label>
            <input 
                type="text" 
                className="form-item-input" 
                value={experience.skillName} placeholder="Ex: Senior Software Engineer"
                name="skillName"
                onChange={onChangeInput}    
                ref={skillNameRef}
            />
            <span className="error">{error.skillName}</span>
        </div>
        <div className="form-item">
            <label htmlFor="" className="form-item-label">Giai đoạn làm việc</label>
            <div className="row">
                <div className="col">
                    <input ref={experienceFromRef} type="number" className="form-item-input" name="experienceFrom" value={experience.experienceFrom} onChange={onChangeInput}/>
                    <span className="error">{error.experienceFrom}</span>
                </div>
                <div className="col">
                    <input ref={experienceToRef} type="number" className="form-item-input" name="experienceTo" value={experience.experienceTo} onChange={onChangeInput}/>
                    <span className="error">{error.experienceTo}</span>
                </div>
            </div>
        </div>
        <div className="form-item">
            <label htmlFor="" className="form-item-label">Chi tiết công việc</label>
            <textarea ref={detailRef} className="form-item-input" name="detail" onChange={onChangeInput} value={experience.detail}/>
            <span className="error">{error.detail}</span>
        </div>
        <div className="btnGroup d-flex justify-content-end">
            <button className="btn btnSubmit" onClick={saveExperience}>Save</button>
            <button className="btn btnCancel" onClick={handleClose}>Cancel</button>
      </div>
    </Dialog>
  );
}

export default ExperienceDialog;
