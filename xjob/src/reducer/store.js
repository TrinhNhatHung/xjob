import { configureStore } from "@reduxjs/toolkit";
import user from '../reducer/userSlice';
import detailJobDrawer from '../reducer/detailJobDrawer';
import proposalDialog from "../reducer/proposalDialog";
import editSkillDialog from "../reducer/editSkillDialog";
import experienceDialog from "../reducer/experienceDialog";
import profileDialog from "../reducer/editProfileDialog";
import hiringDialog from "../reducer/hiringDialog";
import jobDialog from "../reducer/editJobDialog.js";
import hourRateDialog from "../reducer/editHourRateDialog.js";

const rootReducer = {
    user,
    detailJobDrawer,
    proposalDialog,
    editSkillDialog,
    experienceDialog,
    profileDialog,
    hiringDialog,
    jobDialog,
    hourRateDialog
};

const store = configureStore({
    reducer : rootReducer
});

export default store;