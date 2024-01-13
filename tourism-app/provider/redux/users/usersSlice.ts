import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string | null;
  birthDate: string | null;
  gender: string | null;
}

const initialState: UserState = {
  email: null,
  birthDate: null,
  gender: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.birthDate = action.payload.birthDate;
      state.gender = action.payload.gender;
    },
    clearUser: (state) => {
      state.email = null;
      state.birthDate = null;
      state.gender = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
