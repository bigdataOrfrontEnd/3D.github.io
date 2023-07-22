const { store } = require("./store/index");

// 订阅数据的变化,就是数据一旦变化就会调用这个函数
//这个方法返回一个方法是用来取消订阅的
store.subscribe(() => {
  console.log("订阅数据的变化", store.getState());
});
// 所以要修改值,必须使用action

// store.dispatch({ type: "chang_name", name: "kobe" });
// 如果大量调用
// store.dispatch({ type: "addNumber", age: 1 });
// store.dispatch({ type: "addNumber", age: 12 });
// store.dispatch({ type: "addNumber", age: 13 });
// store.dispatch({ type: "addNumber", age: 14});

//1. 使用函数,后面要把这个函数单独放入到一个文件中叫actionCreate
// const changeNameAction = (name) => {
//   return {
//     type: "change_name",
//     name,
//   };
// };
// 优化写法:返回的是一个对象,抽离到单独文件里面了
// const changeNameAction = (name) => ({
//   type: "change_name",
//   name,
// });
const { changeNameAction } = require("./store/actionCreate");
store.dispatch(changeNameAction("kobe"));
store.dispatch(changeNameAction("lilei"));
const changAddNumber = (a) => ({
  type: "addNumber",
  age: a,
});
store.dispatch(changAddNumber(20));
