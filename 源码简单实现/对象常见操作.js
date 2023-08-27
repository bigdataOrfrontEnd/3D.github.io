const obj = {
  user: "张三",
  type: "vip",
};
const arr = [{ name: "zhangsan" }, { name: "lisi" }];
const data = arr;
data.splice(1, 1);
console.log(arr);
// 对象遍历
// 1. 普通for
// const infokeys = Object.keys(obj);
// for (let i = 0; i < infokeys.length; i++) {
//   const key = infokeys[i];
//   const value = obj[key];
//   console.log(value);
// }
//拿出第一个键值对的值
// function oneValue(obj) {
//   let value = null;
//   for (let key in obj) {
//     value = obj[key];
//     break;
//   }
//   return value;
// }
//2. 将对象值转化为一个数组
// function two(obj) {
//   return Object.values(obj)[0]; //将对象的值转化为数组,返回一个数组
// }
//3.把对象转为数组,然后根据数组的下标取值
// function three(obj) {
//     Object.keys(obj)//将键名转为数组
//    Object.keys(obj)[0]//拿到数组的第一个键名

//   return obj[Object.keys(obj)[0]];
// }
// console.log(three(obj));
