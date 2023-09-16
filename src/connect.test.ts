/**
 * @vitest-environment jsdom
 */
import { AnyAction, Dispatch, configureStore } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { State } from "vanjs-core";
import { beforeEach, describe, expect, test } from "vitest";
import connectStore from "./connect";
import counter, {
  decrement,
  increment,
  selectCount,
} from "./store/slices/counter";

describe("store with counter slice", () => {
  let store: ToolkitStore;
  let useDispatch: () => Dispatch<AnyAction>;
  let disconnect: () => void;
  let useSelector: <T>(selector: (state: any) => T) => State<T>;

  beforeEach(() => {
    store = configureStore({ reducer: { counter } });
    ({ useDispatch, useSelector, disconnect } = connectStore(store));
  });

  test("useDispatch connects to store.dispatch", () => {
    expect(useDispatch()).toEqual(store.dispatch);
  });

  test("useSelector connects to store.getState", () => {
    const count = useSelector<number>(selectCount);
    expect(count.val).toEqual(store.getState().counter.count);
  });

  test("useSelector reacts to actions", () => {
    const dispatch = useDispatch();
    const count = useSelector(selectCount);

    expect(count.val).toEqual(0);
    dispatch(increment());
    expect(count.val).toEqual(1);
    dispatch(decrement());
    expect(count.val).toEqual(0);
    for (let i = 0; i < 100; i++) dispatch(increment());
    expect(count.val).toEqual(100);
  });

  test("disconnect unsubscribes from store", () => {
    const count = useSelector(selectCount);
    const dispatch = useDispatch();

    expect(count.val).toEqual(0);
    dispatch(increment());
    expect(count.val).toEqual(1);
    dispatch(decrement());
    expect(count.val).toEqual(0);
    for (let i = 0; i < 100; i++) dispatch(increment());
    expect(count.val).toEqual(100);
    disconnect();
    for (let i = 0; i < 100; i++) dispatch(increment());
    expect(count.val).toEqual(100);
  });
});
