// 函数的调用方式:1. 普通函数,2. 函数在对象里面,3. 函数在函数里面,4. 函数在数据结构里面
// 1. 函数
function foo1(name) {
  console.log(`${name}中的this:${this}`);
}
// 普通调用
foo1("普通调用");
// 函数在对象里面,但是被单独调用
var student = {
  name: "小明",
  runnging: function (name) {
    console.log(`${name}中的this:`, this);
  },
};
student.runnging("直接执行"); //this指的就是这个对象student
var bar = student.runnging; //这个是bar调用的指向的是window
bar("小红");
//高阶函数指向也是window
function test(fn) {
  fn("小李");
}
test(student.runnging);
