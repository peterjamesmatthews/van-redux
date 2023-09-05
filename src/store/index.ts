import { configureStore } from "@reduxjs/toolkit";
import connectedStore from "../connect";
import counter from "./slices/counter";

const store = configureStore({
  reducer: {
    counter,
  },
});

connectedStore.init(store);

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export default store;
