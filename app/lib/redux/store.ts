import { configureStore } from "@reduxjs/toolkit";
import resumeSlice from "./resumeSlice";
import settingsSlice from "./settingsSlice";

export const store = configureStore({
  reducer: {
    resume: resumeSlice,
    settings: settingsSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
