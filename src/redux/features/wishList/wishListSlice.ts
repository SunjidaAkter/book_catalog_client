// import { IBook } from "../../../types/globalTypes";
// import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

// interface IWishList {
//   books: IBook[];
//   total: number;
// }

// const initialState: IWishList = {
//   books: [],
//   total: 0,
// };

// const wishListSlice = createSlice({
//   name: "wishList",
//   initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<IBook>) => {
//       const existing = state.books.find(
//         (book) => book._id === action.payload._id
//       );

//       if (existing) {
//         existing.quantity = existing.quantity! + 1;
//       } else {
//         state.books.push({ ...action.payload, quantity: 1 });
//       }

//       state.total += action.payload.price;
//     },
//     removeOne: (state, action: PayloadAction<IProduct>) => {
//       const existing = state.books.find(
//         (book) => book._id === action.payload._id
//       );

//       if (existing && existing.quantity! > 1) {
//         existing.quantity = existing.quantity! - 1;
//       } else {
//         state.books = state.books.filter(
//           (book) => book._id !== action.payload._id
//         );
//       }

//       state.total -= action.payload.price;
//     },
//     removeFromCart: (state, action: PayloadAction<IProduct>) => {
//       state.books = state.books.filter(
//         (book) => book._id !== action.payload._id
//       );

//       state.total -= action.payload.price * action.payload.quantity!;
//     },
//   },
// });

// export const { addToCart, removeFromCart, removeOne } = cartSlice.actions;

// export default cartSlice.reducer;
