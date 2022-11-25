import React from 'react';
import "./editSkillDialog.css";
import Dialog from "@mui/material/Dialog";
import { useDispatch, useSelector } from 'react-redux';
import {closeSkillDialog, deleteSkill, addSkill} from "../../reducer/editSkillDialog";
import { Chip } from "@mui/material";
import { useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import axiosRequireAuthor from '../../api/axiosRequiredAuthor';
import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function EditSkillDialog() {
    const dispatch = useDispatch();
    const {isOpen, skills} = useSelector(state => state.editSkillDialog);
    const [allSkills, setAllSkills] = useState([]);
    const handleClose = () => {
        dispatch(closeSkillDialog());
    };

    const handledeleteSkill = (skill)=> {
        dispatch(deleteSkill({skill}));
    }

    const completeInputSkill = (event, value)=> {
        let skill = {
            skillId: value.skillId,
            skillName: value.skillName
        }
        dispatch(addSkill({skill}));
    }

    const saveSkills = () => {
        let skillIds = skills.map(skill => skill.skillId);
        axiosRequireAuthor.post("/user/update-freelancer-skill", null, {
            params : {
                skillIdList: skillIds
            }
        })
        .then((response)=> {
            dispatch(closeSkillDialog());
            window.location.reload();
        })
        .catch(()=> {
        })
    }

    useEffect(()=> {
        axiosClient.get("/skill/popular-skills")
        .then((response)=> {
            let skills = [];
            response.skills.forEach((skill)=> {
                skills = skills.concat({
                    ...skill,
                    label: skill.skillName
                });
            })
            setAllSkills(skills);
        })
        .catch(()=> {
        })
    },[isOpen]);

    return (
    <Dialog
      classes={{
        paper: "editSkillForm"
      }}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="formTitle">Cập nhật kĩ năng</div>
      <div className="form-item">
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={allSkills}
            renderInput={(params) => <TextField {...params} />}
            onChange={completeInputSkill}
        />
      </div>
      <div className="mt-3">
        {
            skills.map((skill, index) => {
                return <Chip
                        key={index}
                        className="skillChip mg-r-5"
                        label={skill.skillName}
                        onDelete={()=> handledeleteSkill(skill)}
                    />
            })
        }
      </div>
      <div className="btnGroup d-flex justify-content-end">
        <button className="btn btnSubmit" onClick={saveSkills}>Save</button>
        <button className="btn btnCancel" onClick={handleClose}>Cancel</button>
      </div>
    </Dialog>
    );
}

export default EditSkillDialog;