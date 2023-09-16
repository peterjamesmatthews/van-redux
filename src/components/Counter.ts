import van from "vanjs-core";
import { useDispatch } from "../store";
import { decrement, increment } from "../store/slices/counter";
import Count from "./Count";

const { br, button, div } = van.tags;

export default function Counter() {
  const dispatch = useDispatch();

  return div(
    button({
      textContent: "Increment",
      style: "user-select: none;",
      onclick: () => dispatch(increment()),
    }),
    button({
      textContent: "Decrement",
      style: "user-select: none;",
      onclick: () => dispatch(decrement()),
    }),
    br(),
    ...Array(50).fill(Count())
  );
}
