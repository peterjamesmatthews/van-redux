import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { State } from "..";

export interface Counter {
  count: number;
}

const initialState: Counter = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count++;
    },
    decrement: (state) => {
      state.count--;
    },
    incrementBy: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
  },
});

export const selectCount = (state: State) => state.counter.count;

export const { increment, decrement, incrementBy } = counterSlice.actions;
export default counterSlice.reducer;
