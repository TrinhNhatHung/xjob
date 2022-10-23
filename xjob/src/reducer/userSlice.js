import { createSlice } from "@reduxjs/toolkit";

const initUser = {
    isAuthen : false,
    uid: null,
    avatarUrl: null,
    lastName: null,
    firstName: null,
    email:null,
    token: null
}

const user = createSlice({
    name: "user",
    initialState: initUser,
    reducers: {
        login(state, action) {
            state.isAuthen = true;
            state.uid = action.payload.uid;
            state.lastName = action.payload.lastName;
            state.firstName = action.payload.firstName;
            state.avatarUrl = action.payload.avatarUrl;
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
        logout(state) {
            state.isAuthen = false;
            state.uid = null;
            state.lastName = null;
            state.firstName = null;
            state.avatarUrl = null;
            state.email = null;
        },
        signup(state,action){
            state.isAuthen = true;
            state.uid = action.payload.uid;
            state.lastName = action.payload.lastName;
            state.firstName = action.payload.firstName;
            state.avatarUrl = action.payload.avatarUrl;
            state.email = action.payload.email;
            state.token = action.payload.token;
        }
    }
});

const { reducer } = user;
export const { login, logout,signup } = user.actions;
export default reducer;