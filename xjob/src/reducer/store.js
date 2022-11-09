import { configureStore } from "@reduxjs/toolkit";
import user from '../reducer/userSlice';
import detailJobDrawer from '../reducer/detailJobDrawer';
import proposalDialog from "../reducer/proposalDialog";

const rootReducer = {
    user,
    detailJobDrawer,
    proposalDialog
};

const store = configureStore({
    reducer : rootReducer
});

export default store;