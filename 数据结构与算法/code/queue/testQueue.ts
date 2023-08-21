import ArrayQueue from "./ArrayQueue";
const queue = new ArrayQueue<string>();
queue.enqueue("hell");
queue.enqueue("newe");
console.log(queue.peek());
console.log(queue.dequeue());
//击鼓传花
function hotPoto(arr: string[], num: number): string {
  //创建一个队列
  const queue = new ArrayQueue<string>();

  //将数据的数据放入到队列中
  for (const name of arr) {
    queue.enqueue(name);
  }
  //思路:将队列的第一个元素放入到队尾,数到那个数字就让他出队列,当队列只有一个数字的时候就停止

  while (queue.size() > 1) {
    for (let i = 1; i < num; i++) {
      const name = queue.dequeue();
      if (name) queue.enqueue(name);
    }
    queue.dequeue();
  }
  return queue.dequeue()!;
}
console.log(hotPoto(["1", "2", "3"], 2));
//约瑟夫环的问题:就是找到一个安全位置
function ysf(position: number, num: number): number {
  //创建队列
  const queue = new ArrayQueue<number>();
  // 将数据放入到队列中
  for (let i = 0; i < position; i++) {
    queue.enqueue(i);
  }
  while (queue.size() > 1) {
    for (let i = 1; i < num; i++) {
      queue.enqueue(queue.dequeue()!);
    }
    queue.dequeue();
  }
  return queue.dequeue()!;
}
console.log(ysf(5, 3));
