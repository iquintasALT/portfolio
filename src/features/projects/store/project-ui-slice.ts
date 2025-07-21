import texts from "@content/texts.json";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { Project } from "@/types/project";

interface ProjectUiState {
  projects: Project[];
  selected: Project | null;
  carouselIndex: number;
  layout: "carousel" | "sidepanel";
  filtersOpen: boolean;
  selectedCategory: string | null;
  selectedLanguage: string | null;
}

const initialState: ProjectUiState = {
  projects: (texts.projects ?? []) as Project[],
  selected: null,
  carouselIndex: 0,
  layout: "carousel",
  filtersOpen: false,
  selectedCategory: null,
  selectedLanguage: null,
};

const projectUiSlice = createSlice({
  name: "projectUi",
  initialState,
  reducers: {
    setProjects(state, action: PayloadAction<Project[]>) {
      state.projects = action.payload;
    },
    setSelected(state, action: PayloadAction<Project | null>) {
      state.selected = action.payload;
    },
    setCarouselIndex(state, action: PayloadAction<number>) {
      state.carouselIndex = action.payload;
    },
    setLayout(state, action: PayloadAction<"carousel" | "sidepanel">) {
      state.layout = action.payload;
    },
    setFiltersOpen(state, action: PayloadAction<boolean>) {
      state.filtersOpen = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload;
    },
    setSelectedLanguage(state, action: PayloadAction<string | null>) {
      state.selectedLanguage = action.payload;
    },
  },
});

export const {
  setProjects,
  setSelected,
  setCarouselIndex,
  setLayout,
  setFiltersOpen,
  setSelectedCategory,
  setSelectedLanguage,
} = projectUiSlice.actions;

export default projectUiSlice.reducer;
