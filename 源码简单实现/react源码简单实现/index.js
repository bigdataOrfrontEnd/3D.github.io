//作用;根据一个类型,props,children返回一个json
/**
 *
 * @param {*} type 类型
 * @param {*} props 属性
 * @param  {...any} children 子节点
 * @returns
 */
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === "object" ? child : createTextElement(child);
      }),
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

//实现render函数,只实现向DOM中添加内容,不着急实现更新和删除
/**
 *
 * @param {*} element DOM元素
 * @param {*} container 挂载点
 */
function render(element, container) {
  //1. 根据type创建html元素
  // const node = document.createElement(element.type);
  //4. 判断是否是文本节点
  const node =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);
  //5. 将props中非children的属性都传入到dom节点中
  //5. 1 判断传入的是否是children
  const isProperty = (key) => key !== "children";
  //Object.keys() 静态方法返回一个由给定对象自身的可枚举的字符串键属性名组成的数组。
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((prop) => (node[prop] = element.props[prop]));
  //3. 使用递归对子元素执行相同的操作
  //todo:这个递归会导致性能底下
  element.props.children.forEach((child) => {
    render(child, node);
  });
  //2. 将Dom元素挂载到root上
  container.appendChild(node);
}

const Didact = {
  createElement,
  render,
};
//test
//这个注释就是告诉babel用我的方法来解析下面的代码,这个需要放入到https://babeljs.io/中去执行
// /** @jsx Didact.createElement*/
// const element = (
//   <div id="foo">
//     <a>bar</a>
//     <b />
//   </div>
// );
// babel中执行的结果是这个样子的
// const element = Didact.createElement(
//   "div",
//   {
//     id: "foo",
//   },
//   Didact.createElement("a", null, "bar"),
//   Didact.createElement("b", null)
// );
const App = Didact.createElement(
  "div",
  { id: "foo" },
  Didact.createElement("a", null, "bar"),
  Didact.createElement("b")
);

Didact.render(App, document.querySelector("#root"));
