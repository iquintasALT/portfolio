import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface FiltersState {
  search: string;
  tags: string[];
}

const initialState: FiltersState = {
  search: '',
  tags: [],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setTags(state, action: PayloadAction<string[]>) {
      state.tags = action.payload;
    },
    clearFilters(state) {
      state.search = '';
      state.tags = [];
    },
  },
});

export const { setSearch, setTags, clearFilters } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
