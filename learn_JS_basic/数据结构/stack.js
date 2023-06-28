// 栈是后进先出的
class Stack {
  constructor(value) {
    this.items = [value];
  }
  //入栈
  push(item) {
    this.items.push(item);
  }
  //出栈
  pop() {
    if (!this.isEmpty()) {
      return this.items.pop();
    }
  }
  //   将数组第一个元素删除
  peek() {
    if (!this.isEmpty()) return this.items.shift();
  }
  //判空
  isEmpty() {
    return this.items.length === 0;
  }
  //栈的长度
  size() {
    return this.items.length;
  }
}
