interface ILinkedList<T> {
  /**
   * 向链表尾部添加一个新的项
   * @param element
   */
  append(element: T): void;
  /**
   * 向链表的特定位置插入一个新的元素
   * @param position : 位置;
   * @param element :元素;
   * returen:boolean
   */
  insert(position: number, element: T): boolean;
  /**
   * 遍历链表
   */
  traverse(): void;
  /**
   * 将元素插入到链表中
   * @param position : 位置,元素;
   * @param element
   */
  insert(position: number, element: T): boolean;
  /**
   * 根据传入的位置信息删除元素
   * @param position : 位置;
   */
  removeAt(position: number): T;
}
export default ILinkedList;
