function foo() {
  console.log("我是foo函数");
  setTimeout(function () {
    console.log("我是等待函数");
  }, 3000);
}
function bar() {
  console.log("我是bar函数");
  foo();
  console.log("Hello World");
}
bar();
