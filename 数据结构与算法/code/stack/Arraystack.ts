import IsStack from "./IsStack";
class ArrayStack<T> implements IsStack<T> {
  // 定义一个数组用于存放数据
  private data: T[] = [];
  //将元素加入栈中,可以没有返回值,
  //   todo:后续可以加入返回加入是否成功
  push(element: T): void {
    this.data.push(element);
  }
  //出栈
  pop(): T | undefined {
    return this.data.pop();
  }
  //查看当前栈顶元素
  peek(): T | undefined {
    return this.data[this.data.length - 1];
  }
  //判断是否为空
  isEmpty(): boolean {
    return this.data.length === 0;
  }
  //返回栈的大小
  size(): number {
    return this.data.length;
  }
}
export default ArrayStack;
