import { State } from "vanjs-core";
import con from "../connect";
import { selectCount } from "../store/slices/counter";

type CountProps = {
  count: State<number>;
};

function Count({ count }: CountProps) {
  return count;
}

export default con.nect({ count: selectCount })(Count);
