import { createSlice } from "@reduxjs/toolkit";

const initStatus = {
    isOpen : false,
    skills: []
}

const editSkillDialog = createSlice({
    name: "editSkillDialog",
    initialState: initStatus,
    reducers: {
        openSkillDialog: (state, action)=> {
            state.isOpen = true;
            state.skills = action.payload.skills;
        },
        closeSkillDialog: (state)=> {
            state.isOpen = false;
            state.skills = [];
        },
        deleteSkill: (state, action)=> {
            let deleteSkill = action.payload.skill;
            state.skills = state.skills.filter(skill => skill.skillId !== deleteSkill.skillId);
        },
        addSkill: (state, action) => {
            let addedSkill = action.payload.skill;
            if (!state.skills.find(skill => skill.skillId === addedSkill.skillId)){
                state.skills = state.skills.concat(addedSkill);
            }
        }
    }
});

const { reducer } = editSkillDialog;
export const { openSkillDialog, closeSkillDialog, addSkill, deleteSkill } = editSkillDialog.actions;
export default reducer;