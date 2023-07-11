// 只有函数和全局才能形成
// 作用域,对象没有作用域
class boor {
  constructor() {
    this.name = "小李";
    this.age = 18;
  }
}
var name = "qiagoag";
function boo(name) {
  this.name = name;
  console.log("helloword", name);
}
boo.apply(boor, [name]);
