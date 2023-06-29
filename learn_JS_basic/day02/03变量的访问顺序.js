// 最近原则
var message = "hello";
function bar() {
  // var message = "ww";
  console.log(message);
}
function boo() {
  //   var message = "d";

  bar();
}
boo();
