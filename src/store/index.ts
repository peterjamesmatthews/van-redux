import { configureStore } from "@reduxjs/toolkit";
import connectStore from "../connect";
import counter from "./slices/counter";

const store = configureStore({
  reducer: {
    counter,
  },
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export default store;
export const { useDispatch, useSelector, disconnect } = connectStore(store);
