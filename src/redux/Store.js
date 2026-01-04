import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./Slices/CartSlice";
import InventorySlice from "./Slices/InventorySlice";

const STORAGE_KEY = "shop_cart_v1";

function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return undefined;
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return undefined;
        return { cart: parsed };
    } catch (e) {
        console.warn("Failed to load state from localStorage", e);
        return undefined;
    }
}

function saveState(state) {
    try {
        const toSave = state && Array.isArray(state.cart) ? state.cart : [];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
        console.warn("Failed to save state to localStorage", e);
    }
}

export const store = configureStore({
    reducer: {
        cart: CartSlice,
        inventory: InventorySlice,
    },
    preloadedState: loadState(),
});

// subscribe to store changes and persist cart
store.subscribe(() => {
    saveState(store.getState());
});