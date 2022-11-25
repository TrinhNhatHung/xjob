import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from "@mui/material/Dialog";
import {closeProfileDialog, setProfile} from "../../reducer/editProfileDialog";
import "./editProfileDialog.css";
import axiosRequiredAuthor from '../../api/axiosRequiredAuthor';
import { useState } from 'react';
import {textToHtml} from "../../util/HtmlTagUtil";

function EditMainSkillDialog() {
    const profileDialog = useSelector(state => state.profileDialog);
    const dispatch = useDispatch();
    const handleClose = ()=> {
        dispatch(closeProfileDialog());
        setError({
            mainSkill: null,
            introduction: null
        })
    }

    const onChangeInput = (event)=> {
        let name = event.target.name;
        let value = event.target.value;
        dispatch(setProfile({
            ...profileDialog,
            [name]: value
        }));   
    }

    const mainSkillRef = useRef();
    const introductionRef = useRef();

    const [error, setError] = useState({
        mainSkill: null,
        introduction: null
    })

    const saveInfo = ()=> {
        mainSkillRef.current.classList.remove("borderError");
        introductionRef.current.classList.remove("borderError");

        let validate = true;

        let mainSkillCheck = null;
        if (profileDialog.mainSkill === null || profileDialog.mainSkill === undefined || profileDialog.mainSkill === ""){
            mainSkillCheck = "Bắt buộc nhập";
            mainSkillRef.current.classList.add("borderError");  
            validate = false;         
        }

        let introductionCheck = null;
        if (profileDialog.introduction === null || profileDialog.introduction === undefined || profileDialog.introduction === ""){
            introductionCheck = "Bắt buộc nhập";
            introductionRef.current.classList.add("borderError");  
            validate = false;         
        }

        setError({
            ...error,
            mainSkill: mainSkillCheck,
            introduction: introductionCheck
        })

        if (validate){
            axiosRequiredAuthor.post("/user/update-freelancer-info", null, {
                params: {
                    mainSkill: profileDialog.mainSkill,
                    introduction: textToHtml(profileDialog.introduction)
                }
            })
            .then(()=> {
                dispatch(closeProfileDialog());
                window.location.reload();
            })
            .catch(()=> {
                // todo
            });
        }
    }

    return (
    <Dialog
      classes={{
        paper: "editMainSkillForm"
      }}
      open={profileDialog.isOpen && profileDialog.kind === "MAIN_SKILL"}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="formTitle">Cập nhật thông tin bản thân</div>
      <div className="form-item">
        <label htmlFor="mainSkill" className="form-item-label">Chức danh</label>
        <input 
            ref={mainSkillRef}
            type="text" id="mainSkill" name="mainSkill" className="form-item-input" 
            value={profileDialog.mainSkill}
            onChange={onChangeInput}
        />
        <span className="error">{error.mainSkill}</span>
      </div>
      <div className="form-item mt-3">
        <label htmlFor="introduction" className="form-item-label">Giới thiệu bản thân</label>
        <textarea 
            ref={introductionRef}
            name="introduction" id="introduction" className="form-item-input"
            onChange={onChangeInput}
            value={profileDialog.introduction}
        />
        <span className="error">{error.introduction}</span>
      </div>
      <div className="btnGroup d-flex justify-content-end">
        <button className="btn btnSubmit" onClick={saveInfo}>Lưu</button>
        <button className="btn btnCancel" onClick={handleClose}>Huỷ</button>
      </div>
    </Dialog>
    );
}

export default EditMainSkillDialog;