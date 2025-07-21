import { configureStore } from "@reduxjs/toolkit";

import { filtersReducer } from "@/features/projects/store/filter-slice";
import projectUiReducer from "@/features/projects/store/project-ui-slice";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    projectUi: projectUiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
