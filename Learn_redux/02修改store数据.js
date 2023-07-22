const { store } = require("./store/index");
console.log(store.getState());
//这样修改无法做到响应式,
// store.getState().name = "how";
// 所以要修改值,必须使用action
const nameAction = { type: "chang_name", name: "kobe" };
// 将action进行派发
store.dispatch(nameAction);
console.log(store.getState());
const ageAction = { type: "addNumber", age: 1 };
store.dispatch(ageAction);
console.log(store.getState());
