import { createSlice } from "@reduxjs/toolkit";

const initStatus = {
    isOpen : false,
    job: {
        skills: []
    }
}

const jobDialog = createSlice({
    name: "jobDialog",
    initialState: initStatus,
    reducers: {
        openJobDialog: (state,action)=> {
            state.isOpen = true;
            state.job = action.payload.job;
        },
        closeJobDialog: (state)=> {
            state.isOpen = false;
            state.job = {
                skills: []
            }
        },
        setJobDialog: (state,action)=> {
            state.job = action.payload.job;
        }
    }
});

const { reducer } = jobDialog;
export const { openJobDialog, closeJobDialog, setJobDialog } = jobDialog.actions;
export default reducer;