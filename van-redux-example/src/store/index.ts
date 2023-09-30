import { configureStore } from "@reduxjs/toolkit";
import connect from "van-redux";
import counter from "./slices/counter";

const store = configureStore({ reducer: { counter } });

export type State = ReturnType<typeof store.getState>;
export const { useSelector, disconnect } = connect(store);
export default store;
