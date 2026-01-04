import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add: (state, action) => {
      const prod = action.payload;
      if (!prod || prod.id == null) return;
      const existing = state.find((i) => i.id === prod.id);
      if (existing) {
        const currentQty = existing.quantity || 1;
        if (currentQty < 3) {
          existing.quantity = currentQty + 1;
        }
        // if already 3, do nothing (max cap)
      } else {
        state.push({ ...prod, quantity: 1 });
      }
    },
    removeOne: (state, action) => {
      const id = action.payload;
      const idx = state.findIndex((i) => i.id === id);
      if (idx === -1) return;
      const item = state[idx];
      if ((item.quantity || 1) > 1) {
        item.quantity = item.quantity - 1;
      } else {
        state.splice(idx, 1);
      }
    },
    removeAll: (state, action) => {
      const id = action.payload;
      return state.filter((item) => item.id !== id);
    },
  },
});

export const { add, removeOne, removeAll } = CartSlice.actions;
export default CartSlice.reducer;
