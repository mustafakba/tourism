import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/users/usersSlice";
import tripsReducer from "../redux/trips/tripSlice";
import cartReducer from "../redux/cart/cartSlice";

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    user: userReducer,
    trips: tripsReducer,
    cart: cartReducer,
  },
});
