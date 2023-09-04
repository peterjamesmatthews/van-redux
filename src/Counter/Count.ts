import van, { State } from "vanjs-core";

type CountProps = {
  count: State<number>;
};

export default function ({ count }: CountProps) {
  return van.tags.span(count);
}
