import IList from "../inteface";

interface IsStack<T> extends IList<T> {
  //栈的共用方法有
  push(element: T): void;
  pop(): T | undefined;
}
export default IsStack;
