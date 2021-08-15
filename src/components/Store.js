import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import reducers from "../reducers";

export default createStore(reducers, applyMiddleware(promise, thunk));