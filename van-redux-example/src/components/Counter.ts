import van from "vanjs-core";
import store from "../store";
import { decrement, increment } from "../store/slices/counter";
import Count from "./Count";

const { br, button, div } = van.tags;

export default function Counter() {
  console.log("Counter");

  return div(
    button({
      textContent: "Increment",
      style: "user-select: none;",
      onclick: () => store.dispatch(increment()),
    }),
    button({
      textContent: "Decrement",
      style: "user-select: none;",
      onclick: () => store.dispatch(decrement()),
    }),
    br(),
    ...Array(50).fill(Count())
  );
}
