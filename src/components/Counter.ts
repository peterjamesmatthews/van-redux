import van from "vanjs-core";
import con from "../connect";
import { Dispatch } from "../store";
import { decrement, increment } from "../store/slices/counter";
import Count from "./Count";

type Props = {
  dispatch: Dispatch;
};

function Counter({ dispatch }: Props) {
  return van.tags.div(
    van.tags.button({
      textContent: "Increment",
      style: "user-select: none;",
      onclick: () => {
        dispatch(increment());
      },
    }),
    van.tags.button({
      textContent: "Decrement",
      style: "user-select: none;",
      onclick: () => {
        dispatch(decrement());
      },
    }),
    van.tags.br(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count(),
    Count()
  );
}

export default con.nect()(Counter);
