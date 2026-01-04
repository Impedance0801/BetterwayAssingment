import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_QUANTITY = 3;

const initialState = {
  // mapping productId -> remaining quantity
  stock: {},
};

export const InventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      const products = Array.isArray(action.payload) ? action.payload : [];
      const map = {};
      products.forEach((p) => {
        if (p && p.id != null) map[p.id] = DEFAULT_QUANTITY;
      });
      state.stock = map;
    },
    decrementStock: (state, action) => {
      const payload = action.payload;
      if (!payload) return;
      const id = payload.id ?? payload;
      const qty = Number(payload.qty ?? 1);
      if (id == null) return;
      const cur = Number(state.stock[id] || 0);
      state.stock[id] = Math.max(0, cur - qty);
    },
    incrementStock: (state, action) => {
      const payload = action.payload;
      if (!payload) return;
      const id = payload.id ?? payload;
      const qty = Number(payload.qty ?? 1);
      if (id == null) return;
      const cur = Number(state.stock[id] || 0);
      state.stock[id] = Math.min(DEFAULT_QUANTITY, cur + qty);
    },
    incrementStockBy: (state, action) => {
      const { id, qty } = action.payload || {};
      if (id == null) return;
      const cur = Number(state.stock[id] || 0);
      state.stock[id] = Math.min(DEFAULT_QUANTITY, cur + Number(qty || 0));
    },
    decrementStockBy: (state, action) => {
      const { id, qty } = action.payload || {};
      if (id == null) return;
      const cur = Number(state.stock[id] || 0);
      state.stock[id] = Math.max(0, cur - Number(qty || 0));
    },
    setStockForItem: (state, action) => {
      const { id, qty } = action.payload || {};
      if (id == null) return;
      state.stock[id] = Number(qty || 0);
    },
  },
});

export const { setProducts, decrementStock, incrementStock, incrementStockBy, decrementStockBy, setStockForItem } = InventorySlice.actions;
export default InventorySlice.reducer;
