import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const meddleware = [thunk];

const initailState = {};

const store = createStore(
  rootReducer,
  initailState,
  composeWithDevTools(applyMiddleware(...meddleware))
);

export default store;
