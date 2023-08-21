import ILinkedList from "./IsLinked";

class Node<T> {
  value: T;
  // 如果没有null=null就会报Property 'next' has no initializer and is not definitely assigned in the constructor
  next: Node<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}
class LinkedList<T> implements ILinkedList<T> {
  // 定义链表的头,最开始表头是指向null的
  private head: Node<T> | null = null;
  //定义链表的大小,初始化大小为0
  size: number = 0;
  //给一个默认值获取链表的长度
  get length(): number {
    return this.size;
  }

  append(element: T): void {
    //将element放入到Node节点的数据区域
    const newNode = new Node<T>(element);
    //head指向新添加的节点

    //两种情况:1. 链表最开始就是空的,2.链表最开始不是空的this.head===null和!this.head一样
    if (this.head === null) {
      // 1. 链表最开始就是空的,
      this.head = newNode;
    } else {
      // 2.链表不是空的
      let current = this.head;
      // 移动指针,让它指向链表的最后一个,这个时候current代表的是最后一个元素
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    // new一次size加一次
    this.size++;
  }
  //循环链表,并打印链表的每一个值
  traverse(): void {
    let value: T[] = [];
    //定义一个指针,初始化是指向head头,然后用来移动指向每一个Node节点
    let current = this.head;
    // 结束的条件是current指向null,这个时候current代表的是null
    while (!(current === null)) {
      value.push(current.value);
      // console.log(current.value);
      //向后移动
      current = current.next;
    }
    console.log(value.join("->"));
  }
  insert(position: number, element: T): boolean {
    const newNode = new Node<T>(element);
    //先做边界判断
    if (position < 0 || position > this.length) return false;
    //插入的位置有三种:1. 头,2.中间,3.尾部
    //1.的条件是:
    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      //移动链表到要插入的位置
      // 1.使用指针法去移动链表
      let cuttent = this.head;
      for (let index = 0; index < position - 1; index++) {
        cuttent = cuttent?.next!;
      }
      //新节点指向当前位置
      newNode.next = cuttent?.next!;
      cuttent!.next = newNode;
    }
    this.size++;
    return true;
  }
  removeAt(position: number): T {
    throw new Error("Method not implemented.");
  }
}
export default LinkedList;
