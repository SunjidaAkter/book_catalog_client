import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IBook {
  currentPage: number;
}

const initialState: IBook = {
  currentPage: 1,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    // toggleState: (state) => {
    //   state.status = !state.status;
    // },
    setCurrentPageForNext: (state) => {
      state.currentPage += 1;
    },
    setCurrentPageForPrevious: (state) => {
      state.currentPage -= 1;
    },
  },
});

export const { setCurrentPageForPrevious, setCurrentPageForNext } =
  bookSlice.actions;

export default bookSlice.reducer;
