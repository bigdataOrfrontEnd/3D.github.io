//给一个构造函数
function boo() {
  (this.name = "小李"), console.log(`${this.name}:`, this);
}
new boo();
