import LinkedList from "./linkedList";
const linkedList = new LinkedList<string>();
linkedList.append("aaa");
linkedList.append("别别别");
linkedList.insert(1, "bbb");
linkedList.traverse();
console.log();
