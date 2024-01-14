import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/provider/redux/users/usersSlice";
import tripsReducer from "@/provider/redux/trips/tripSlice";
export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    user: userReducer,
    trips: tripsReducer,
  },
});
