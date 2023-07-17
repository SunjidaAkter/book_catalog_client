import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IBook {
  currentPage: number;
  publicationYear: number;
  genre: string;
  searchTerm: string;
}

const initialState: IBook = {
  currentPage: 1,
  publicationYear: 2023,
  genre: "প্রোগ্রামিং",
  searchTerm: "",
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setPublicationYear: (state, action: PayloadAction<number>) => {
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
  },
});

export const {
  setPublicationYear,
  setCurrentPageForPrevious,
  setCurrentPageForNext,
  setGenre,
  setSearchTerm,
} = bookSlice.actions;

export default bookSlice.reducer;
