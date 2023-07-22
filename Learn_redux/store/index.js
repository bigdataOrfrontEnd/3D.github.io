const { createStore } = require("redux");
const { ChangeName } = require("./constens");
//初始化的值,只会使用一次
const initStore = {
  name: "why",
  age: 18,
};
//reduce一定要是一个纯函数
//第一个参数:store中目前保存的state
//第二个参数:dispatch出入的action
//返回值会作为store之后存储的state
function reduce(state = initStore, action) {
  // console.log(state, action);
  //   //   有数据跟新时候返回新的state
  //   if (action.type === "chang_name") {
  //     return { ...state, name: action.name };
  //   } else if (action.type === "addNumber") {
  //     return { ...state, age: state.age + action.age };
  //   }
  //   return state;
  switch (action.type) {
    case "change_name":
      return { ...state, name: action.name };
    case "addNumber":
      return { ...state, age: state.age + action.age };

    default:
      return state;
  }
}
const store = createStore(reduce);
module.exports = {
  store,
};
