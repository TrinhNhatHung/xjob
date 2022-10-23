import { configureStore } from "@reduxjs/toolkit";
import user from '../reducer/userSlice';
import detailJobDrawer from '../reducer/detailJobDrawer';

const rootReducer = {
    user,
    detailJobDrawer
};

const store = configureStore({
    reducer : rootReducer
});

export default store;