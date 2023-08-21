import ArrayStack from "./Arraystack";

console.log("测试栈是否能用");
const stack = new ArrayStack<number>();

//十进制转二进制
function decimalToBinary(decimal: number): string {
  //每次除以都将余数放入到栈中
  const stack = new ArrayStack<number>();
  while (decimal > 0) {
    const result = decimal % 2;
    stack.push(result);
    decimal = Math.floor(decimal / 2);
  }
  let binary = "";
  while (!stack.isEmpty()) {
    console.log(stack.peek());

    binary += stack.pop();
  }
  return binary;
}
console.log(decimalToBinary(35));
//判断输入的括号是否有效
function gBracket(bracket: string): boolean {
  //定义一个栈,将左侧的括号放入到栈中,遇到右侧的就出栈对比一下是否正确
  const stack = new ArrayStack<string>();
  for (let i = 0; i <= bracket.length; i++) {
    const c = bracket[i];
    switch (c) {
      case "{":
        stack.push("}");
        break;
      case "(":
        stack.push(")");
        break;
      case "[":
        stack.push("]");
        break;
      default:
        if (!(c === stack.pop())) return false;
    }
  }
  if (!stack.isEmpty()) return false;
  return true;
}
console.log(gBracket("{([])}{}"));
