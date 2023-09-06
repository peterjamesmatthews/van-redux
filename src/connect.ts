import { Unsubscribe } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import van, { State } from "vanjs-core";

/**
 * Necessary state and functionality to connect a redux store to VanJS
 */
export class ConnectedStore {
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
    this.unsubscribe = store.subscribe(this.update.bind(this));
    this.connections = new Map();
  }

  update() {
    const state = this.store.getState();
    this.connections.forEach(
      (vanState, selector) => (vanState.val = selector(state))
    );
  }

  disconnect() {
    this.unsubscribe();
  }

  // TODO fix these type hints so that they won't just say "kwargs?: {}"
  connect(kwargsToSelectors: { [name: string]: any } = {}) {
    const state = this.store.getState();
    const connectedKwargs = Object.entries(kwargsToSelectors).reduce(
      (kwargs: any, [kwarg, selector]) => {
        // reuse or create a VanJS state for this selector's target
        let vanState = this.connections.get(selector);
        if (vanState === undefined) {
          vanState = van.state(selector(state));
          this.connections.set(selector, vanState);
        }
        // set the state into the connected components kwargs
        kwargs[kwarg] = vanState;
        // track this connection
        this.connections.set(selector, vanState);
        return kwargs;
      },
      { dispatch: this.store.dispatch } // always connect this store's dispatch function
    );
    return (component: any) =>
      (kwargs = {}) =>
        component({ ...kwargs, ...connectedKwargs });
  }
}

function connectStore(store: ToolkitStore) {
  const connectedStore = new ConnectedStore(store);
  return connectedStore.connect.bind(connectedStore);
}

export default connectStore;
