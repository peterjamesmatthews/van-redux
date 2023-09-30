/**
 * @vitest-environment jsdom
 */
import { configureStore } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { State } from "vanjs-core";
import { beforeEach, describe, expect, test } from "vitest";
import counter, {
  decrement,
  increment,
  selectCount,
} from "../van-redux-example/src/store/slices/counter";
import connectStore from "./connect";

describe("store with counter slice", () => {
  let store: ToolkitStore;
  let disconnect: () => void;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */ // TODO type this
  let useSelector: <T>(selector: (state: any) => T) => State<T>;

  beforeEach(() => {
    store = configureStore({ reducer: { counter } });
    ({ useSelector, disconnect } = connectStore(store));
  });

  test("useSelector connects to store.getState", () => {
    const count = useSelector<number>(selectCount);
    expect(count.val).toEqual(store.getState().counter.count);
  });

  test("useSelector reacts to actions", () => {
    const count = useSelector(selectCount);

    expect(count.val).toEqual(0);
    store.dispatch(increment());
    expect(count.val).toEqual(1);
    store.dispatch(decrement());
    expect(count.val).toEqual(0);
    for (let i = 0; i < 100; i++) store.dispatch(increment());
    expect(count.val).toEqual(100);
  });

  test("disconnect unsubscribes from store", () => {
    const count = useSelector(selectCount);

    expect(count.val).toEqual(0);
    store.dispatch(increment());
    expect(count.val).toEqual(1);
    store.dispatch(decrement());
    expect(count.val).toEqual(0);
    for (let i = 0; i < 100; i++) store.dispatch(increment());
    expect(count.val).toEqual(100);
    disconnect();
    for (let i = 0; i < 100; i++) store.dispatch(increment());
    expect(count.val).toEqual(100);
  });
});
