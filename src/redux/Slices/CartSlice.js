import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add: (state, action) => {
      // Prevent duplicates
      if (!state.some((item) => item.id === action.payload.id)) {
        state.push(action.payload);
      }
    },
    remove: (state, action) => {
      // Return a new array without the removed item
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { add, remove } = CartSlice.actions;
export default CartSlice.reducer;
