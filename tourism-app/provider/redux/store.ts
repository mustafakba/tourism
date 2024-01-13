import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/provider/redux/users/usersSlice"; // Doğru kullanım

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
