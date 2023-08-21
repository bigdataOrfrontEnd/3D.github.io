import IList from "../inteface";
interface Queue<T> extends IList<T> {
  //队列添加数据
  enqueue(element: T): void;
  //出队列方法
  dequeue(): T | undefined;
}
export default Queue;
