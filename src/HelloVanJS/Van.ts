import van from "vanjs-core";
import sleep from "./sleep";

const { pre } = van.tags;

const Van = ({ sleepMs = 100 }) => {
  const headingSpaces = van.state(40),
    trailingUnderscores = van.state(0);

  const animate = async () => {
    while (headingSpaces.val > 0) {
      await sleep(sleepMs);
      --headingSpaces.val, ++trailingUnderscores.val;
    }
  };
  animate();

  return pre(
    () =>
      `${" ".repeat(headingSpaces.val)}🚐💨Hello VanJS!${"_".repeat(
        trailingUnderscores.val
      )}`
  );
};

export default Van;
