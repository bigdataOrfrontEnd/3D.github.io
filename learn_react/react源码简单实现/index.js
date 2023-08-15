/**
 * 作用;根据一个类型,props,children返回一个json
 */
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}
//用来创建文字类型
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}
const Didact = {
  createElement,
};
//这个注释就是告诉babel用我的方法来解析下面的代码
/** @jsx Didact.createElement*/
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);

console.log(element);
