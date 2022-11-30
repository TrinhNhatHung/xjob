import { createSlice } from "@reduxjs/toolkit";

const initStatus = {
    isOpen : false,
    uid: null,
    jobId: null
}

const hiringDialog = createSlice({
    name: "hiringDialog",
    initialState: initStatus,
    reducers: {
        openHiringDialog: (state,action)=> {
            state.isOpen = true;
            state.uid = action.payload.uid;
            state.jobId = action.payload.jobId;
        },
        closeHiringDialog: (state)=> {
            state.isOpen = false;
            state.uid = null;
            state.jobId = null;
        }
    }
});

const { reducer } = hiringDialog;
export const { openHiringDialog, closeHiringDialog } = hiringDialog.actions;
export default reducer;