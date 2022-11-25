import { createSlice } from "@reduxjs/toolkit";

const initStatus = {
    isOpen : false,
    kind: null,
    mainSkill: null,
    introduction: null,
    lastName: null,
    firstName: null,
    hourlyRate: null,
    email: null
}

const profileDialog = createSlice({
    name: "profileDialog",
    initialState: initStatus,
    reducers: {
        openProfileDialog: (state,action)=> {
            state.isOpen = true;
            state.kind = action.payload.kind;
            state.mainSkill = action.payload.mainSkill;
            state.introduction = action.payload.introduction;
            state.lastName = action.payload.lastName;
            state.firstName = action.payload.firstName;
            state.hourlyRate = action.payload.hourlyRate;
            state.email = action.payload.email;
        },
        closeProfileDialog: (state)=> {
            state.isOpen = false;
            state.kind = null;
            state.mainSkill = null;
            state.introduction = null;
            state.lastName = null;
            state.firstName = null;
            state.hourlyRate = null;
            state.email = null;
        },
        setProfile: (state,action)=> {
            state.mainSkill = action.payload.mainSkill;
            state.introduction = action.payload.introduction;
            state.lastName = action.payload.lastName;
            state.firstName = action.payload.firstName;
            state.hourlyRate = action.payload.hourlyRate;
            state.email = action.payload.email;
        }
    }
});

const { reducer } = profileDialog;
export const { openProfileDialog, closeProfileDialog, setProfile } = profileDialog.actions;
export default reducer;