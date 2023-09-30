import van from "vanjs-core";
import Van from "./Van";

const { button, div } = van.tags;

export default function () {
  const dom = div();
  return div(
    button({ onclick: () => van.add(dom, Van({ sleepMs: 2000 })) }, "Hello 🐌"),
    button({ onclick: () => van.add(dom, Van({ sleepMs: 500 })) }, "Hello 🐢"),
    button({ onclick: () => van.add(dom, Van({ sleepMs: 100 })) }, "Hello 🚶‍♂️"),
    button({ onclick: () => van.add(dom, Van({ sleepMs: 10 })) }, "Hello 🏎️"),
    button({ onclick: () => van.add(dom, Van({ sleepMs: 2 })) }, "Hello 🚀"),
    dom,
  );
}
