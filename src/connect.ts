import van from "vanjs-core";

/**
 * Necessary state and functionality to connect a redux store to VanJS
 */
export class ConnectedStore {
  /**
   * Reference to the redux store
   */
  store: any = null;

  /**
   * Array of bindings between a selector function and a VanJS state
   *
   * TODO this is the wrong data structure. Need something to map a selector function to a VanJS state.
   */
  connections: any[] = [];

  /**
   * Array of redux store subscriptions
   */
  unsubscribes: any[] = [];

  init(store: any) {
    this.store = store;
    this.unsubscribes.push(
      store.subscribe(() => {
        const state = store.getState();
        for (const [selector, vanState] of this.connections) {
          vanState.val = selector(state);
        }
      })
    );
  }

  getState() {
    this.store.getState();
  }

  disconnect() {
    this.unsubscribes.forEach((unsubscribe) => unsubscribe());
  }

  connect(kwargsToSelectors: { [name: string]: any }) {
    if (this.store === null) {
      console.warn("Cannot connect to store before it has been initialized.");
      return (component: any) =>
        (kwargs = {}) =>
          component(kwargs);
    }

    const currentState = this.store.getState();

    const connectedKwargs = Object.entries(kwargsToSelectors).reduce(
      (kwargs: { [name: string]: any }, [kwarg, selector]) => {
        // TODO only create a new VanJS state if there isn't already one for this selector function
        const state = van.state(selector(currentState));
        kwargs[kwarg] = state;
        this.connections.push([selector, state]);
        return kwargs;
      },
      { dispatch: this.store.dispatch }
    );

    // TODO fix these type hints so that they won't just say "kwargs?: {}"
    return (component: any) =>
      (kwargs = {}) =>
        component({ ...kwargs, ...connectedKwargs });
  }

  // TODO lol the con.nect API is so ugly
  nect(kwargsToSelectors: { [name: string]: any } = {}) {
    return this.connect(kwargsToSelectors);
  }
}

const connectedStore = new ConnectedStore();
export default connectedStore;
