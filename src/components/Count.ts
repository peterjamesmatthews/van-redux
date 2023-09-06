import { State } from "vanjs-core";
import { connect } from "../store";
import { selectCount } from "../store/slices/counter";

type CountProps = {
  count: State<ReturnType<typeof selectCount>>;
};

function Count({ count }: CountProps) {
  return count;
}

export default connect({ count: selectCount })(Count);
