import { createSlice } from "@reduxjs/toolkit";

const initStatus = {
    isOpen : false,
    hourlyRate: null
}

const hourRateDialog = createSlice({
    name: "hourRateDialog",
    initialState: initStatus,
    reducers: {
        openHourRateDialog: (state,action)=> {
            state.isOpen = true;
            state.hourlyRate = action.payload.hourlyRate;
        },
        closeHourRateDialog: (state)=> {
            state.isOpen = false;
            state.hourlyRate = null
        },
        setHourRateDialog: (state,action)=> {
            state.hourlyRate = action.payload.hourlyRate;
        }
    }
});

const { reducer } = hourRateDialog;
export const { openHourRateDialog, closeHourRateDialog, setHourRateDialog } = hourRateDialog.actions;
export default reducer;