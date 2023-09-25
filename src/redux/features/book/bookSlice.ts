import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IBook {
  currentPage: number;
  publicationYear: number | string;
  genre: string;
  searchTerm: string;
  day: number;
  month: number;
  year: number;
  date: string;
  status: boolean;
}

const initialState: IBook = {
  currentPage: 1,
  publicationYear: "",
  genre: "",
  searchTerm: "",
  day: 1,
  month: 1,
  year: 2023,
  date: "1/1/2023",
  status: false,
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setPublicationYear: (state, action: PayloadAction<number | string>) => {
      state.publicationYear = action.payload;
    },
    setGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setCurrentPageForNext: (state) => {
      state.currentPage += 1;
    },
    setCurrentPageForPrevious: (state) => {
      state.currentPage -= 1;
    },
    setDay: (state, action: PayloadAction<number>) => {
      state.day = action.payload;
    },
    setMonth: (state, action: PayloadAction<number>) => {
      state.month = action.payload;
    },
    setYear: (state, action: PayloadAction<number>) => {
      state.year = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setStatus: (state) => {
      state.status = !state.status;
    },
  },
});

export const {
  setPublicationYear,
  setCurrentPageForPrevious,
  setCurrentPageForNext,
  setGenre,
  setSearchTerm,
  setDate,
  setDay,
  setMonth,
  setYear,
  setStatus,
} = bookSlice.actions;

export default bookSlice.reducer;
