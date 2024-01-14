import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Trip {
  trip_number: string;
  departure_location: string;
  arrival_location: string;
  trip_date: string;
  trip_details: {
    bus_brand: string;
    brand_name: string;
    number_of_breaks: number;
    trip_price: number;
  };
  seat_arrangement: Array<{
    seat_id: string;
    gender: string;
    selected: boolean;
  }>;
}

interface TripsState {
  trips: Trip[];
}

const initialState: TripsState = {
  trips: [],
};

export const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    setTrips: (state, action: PayloadAction<Trip[]>) => {
      state.trips = action.payload;
    },
  },
});

export const { setTrips } = tripsSlice.actions;

export default tripsSlice.reducer;
