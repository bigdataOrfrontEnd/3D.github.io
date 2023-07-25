import { createStore, applyMiddleware, compose } from "redux";
import { reducer } from "./reducer";
import thunk from "redux-thunk";
// 正常情况下store.dispatch(Object)
//想要派发函数:store.dispatch(function),就要使用中间件
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
export { store };
