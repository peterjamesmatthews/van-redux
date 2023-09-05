import store from "./store"; // TODO this import MUST come before `./Counter` otherwise con.nect() won't have an initialized store to connect to
store.getState(); // TODO store doesn't connect unless we call store.getState() here???

import van from "vanjs-core";
import Counter from "./components/Counter";

van.add(document.body, Counter());
