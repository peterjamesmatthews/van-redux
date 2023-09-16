import { Unsubscribe } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import van, { State } from "vanjs-core";

/**
 * Necessary state and functionality to connect a redux store to VanJS
 */
class ConnectedStore {
  /**
   * The redux store this is connected to.
   */
  store: ToolkitStore;

  /**
   * Callback to disconnect this store.
   */
  unsubscribe: Unsubscribe;

  /**
   * Maps selector functions to their van state.
   */
  connections: Map<
    (state: ReturnType<typeof this.store.getState>) => unknown,
    State<unknown>
  >;

  constructor(store: ToolkitStore) {
    this.store = store;
    this.unsubscribe = store.subscribe(this.onStoreUpdate.bind(this));
    this.connections = new Map();
  }

  private onStoreUpdate() {
    const state = this.store.getState();
    this.connections.forEach(
      (vanState, selector) => (vanState.val = selector(state))
    );
  }

  disconnect() {
    this.unsubscribe();
  }

  // TODO - figure out how to type this
  useSelector<T>(selector: (state: any) => T): State<T> {
    return (this.connections.get(selector) ??
      this.connections
        .set(selector, van.state(selector(this.store.getState())))
        .get(selector)) as State<T>;
  }

  useDispatch() {
    return this.store.dispatch;
  }
}

export default function connectStore(store: ToolkitStore) {
  const connectedStore = new ConnectedStore(store);
  return {
    useDispatch: connectedStore.useDispatch.bind(connectedStore),
    useSelector: connectedStore.useSelector.bind(connectedStore),
    disconnect: connectedStore.disconnect.bind(connectedStore),
  };
}
