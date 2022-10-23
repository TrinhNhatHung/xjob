import { createSlice } from "@reduxjs/toolkit";

const initStatus = {
    isOpen : false,
    post: {
        jobId: null,
        title: null,
        detail: null,
        hireAmount: null,
        hiredAmount: null,
        hourPerWeek: null,
        paymentKind: null,
        termClass: null,
        termFrom: null,
        termTo: null,
        price: null,
        createAt: null,
        updateAt: null,
        skills:[]
    }
}

const detailJobDrawer = createSlice({
    name: "detailJobDrawer",
    initialState: initStatus,
    reducers: {
        openDrawer: (state,action)=> {
            state.isOpen = true;
            state.post = action.payload.post;
        },
        closeDrawer: (state)=> {
            state.isOpen = false;
        }
    }
});

const { reducer } = detailJobDrawer;
export const { openDrawer, closeDrawer } = detailJobDrawer.actions;
export default reducer;