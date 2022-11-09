import { createSlice } from "@reduxjs/toolkit";

const initStatus = {
    isOpen : false
}

const proposalDialog = createSlice({
    name: "proposalDialog",
    initialState: initStatus,
    reducers: {
        openDialog: (state)=> {
            state.isOpen = true;
        },
        closeDialog: (state)=> {
            state.isOpen = false;
        }
    }
});

const { reducer } = proposalDialog;
export const { openDialog, closeDialog } = proposalDialog.actions;
export default reducer;