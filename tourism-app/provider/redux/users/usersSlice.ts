import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Ticket {
  seat_id: string;
  trip_number: string;
}

interface UserState {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  birthDate: string | null;
  gender: string | null;
  tickets: Ticket[];
}

const initialState: UserState = {
  firstName: null,
  lastName: null,
  email: null,
  birthDate: null,
  gender: null,
  tickets: [],
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
      state.tickets = action.payload.tickets;
    },
    clearUser: (state) => {
      state.firstName = null;
      state.lastName = null;
      state.email = null;
      state.birthDate = null;
      state.gender = null;
      state.tickets = [];
    },
    addTicket: (state, action: PayloadAction<Ticket>) => {
      if (!state.tickets) {
        state.tickets = [];
      }
      state.tickets.push(action.payload);
    },
    clearTickets: (state) => {
      state.tickets = [];
    },
  },
});

export const { setUser, clearUser, addTicket, clearTickets } =
  userSlice.actions;

export default userSlice.reducer;
