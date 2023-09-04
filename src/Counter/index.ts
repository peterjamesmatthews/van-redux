import van from "vanjs-core";
import Count from "./Count";

export default function () {
  const count = van.state(0);

  return van.tags.div(
    Count({ count }),
    van.tags.br(),
    van.tags.button({
      textContent: "Count",
      style: "user-select: none;",
      onclick: () => count.val++,
    })
  );
}
