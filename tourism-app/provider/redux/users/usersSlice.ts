import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  birthDate: string | null;
  gender: string | null;
}

const initialState: UserState = {
  firstName: null,
  lastName: null,
  email: null,
  birthDate: null,
  gender: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.firstName = action.payload.firstName;
      state.email = action.payload.email;
      state.birthDate = action.payload.birthDate;
      state.gender = action.payload.gender;
    },
    clearUser: (state) => {
      state.firstName = null;
      state.lastName = null;
      state.email = null;
      state.birthDate = null;
      state.gender = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
