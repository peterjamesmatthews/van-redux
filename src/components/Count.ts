import { useSelector } from "../store";
import { selectCount } from "../store/slices/counter";

export default function Count() {
  const count = useSelector(selectCount);
  return count;
}
