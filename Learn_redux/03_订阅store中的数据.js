const { store } = require("./store/index");

// 订阅数据的变化,就是数据一旦变化就会调用这个函数
//这个方法返回一个方法是用来取消订阅的
store.subscribe(() => {
  console.log("订阅数据的变化", store.getState());
});
// 所以要修改值,必须使用action

store.dispatch({ type: "chang_name", name: "kobe" });
store.dispatch({ type: "addNumber", age: 1 });
