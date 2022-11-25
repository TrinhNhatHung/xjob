import { createSlice } from "@reduxjs/toolkit";

const initStatus = {
    isOpen : false,
    experienceId: null,
    experience: {}
}

const experienceDialog = createSlice({
    name: "experienceDialog",
    initialState: initStatus,
    reducers: {
        openExperienceDialog: (state,action)=> {
            state.isOpen = true;
            if (action.payload !== undefined && 
                action.payload.experienceId !== null &&
                action.payload.experienceId !== undefined){
                state.experienceId = action.payload.experienceId;
                state.experience = action.payload.experience;
            }
        },
        closeExperienceDialog: (state)=> {
            state.isOpen = false;
            state.experienceId = null;
            state.experience = {};
        },
        setExperience: (state,action)=> {
            state.experienceId = action.payload.experience.experienceId;
            state.experience = action.payload.experience;
        }
    }
});

const { reducer } = experienceDialog;
export const { openExperienceDialog, closeExperienceDialog, setExperience } = experienceDialog.actions;
export default reducer;