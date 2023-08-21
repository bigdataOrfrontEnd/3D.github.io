import IQueue from "./IQueue";
class ArrayQueue<T> implements IQueue<T> {
  private queue: T[] = [];
  //   添加元素
  enqueue(element: T): void {
    this.queue.push(element);
  }
  //将对一个元素拿出来
  dequeue(): T | undefined {
    return this.queue.shift();
  }
  peek(): T | undefined {
    return this.queue[0];
  }
  isEmpty(): boolean {
    return this.queue.length === 0;
  }
  size(): number {
    return this.queue.length;
  }
}
export default ArrayQueue;
