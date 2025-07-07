import { configureStore } from "@reduxjs/toolkit";
import { filtersReducer } from "~/store/filtersSlice";
import projectUiReducer from "~/store/projectUiSlice";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    projectUi: projectUiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
