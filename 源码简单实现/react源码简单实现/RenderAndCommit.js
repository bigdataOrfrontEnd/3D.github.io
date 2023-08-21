// 上一章的performUnitOfWork有些问题，在第二步中我们直接将新创建的真实dom节点挂载到了容器上，这样会带来两个问题：

// 每次执行performUnitOfWork都会造成浏览器回流重绘，因为真实的dom已经被添加到浏览器上了，性能极差
// 浏览器是可以打断渲染过程的，因此可能会造成用户看到不完整的UI界面

// 我们需要改造一下我们的代码，在performUnitOfWork阶段不把真实的dom节点挂载到容器上。保存fiber tree根节点的引用。等到fiber tree构建完成，再一次性提交真实的dom节点并且添加到容器上。
// 所以我们需要创建一个变量去追踪fiber root 叫 wipRoot
// 同时，我们需要在所有工作完成之后，有一个commit 操作。我们命名为 commitWork
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
//将render中创建dom单独抽离如下
function createDom(fiber) {
  const dom =
    fiber.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);
  const isProperty = (key) => key !== "children";
  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = fiber.props[name];
    });
  return dom;
}
let nextUnitOfWork = null;
let wipRoot = null;
//实现render函数,只用来接收虚拟dom(Virtual DOM)和挂载点
/**
 *
 * @param {*} element DOM元素
 * @param {*} container 挂载点
 */
function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
  };
  //设置nextUnitOfWork为 Fiber 树的根
  nextUnitOfWork = wipRoot;
}
//向浏览器提交渲染
function commitRoot() {
  commitWork(wipRoot.child);
  // 创建一个变量去追踪fiber root 叫 wipRoot
  wipRoot = null;
}
//所有工作完成之后，有一个commit 操作
function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  // debugger;
  const domParent = fiber.parent.dom;
  domParent.appendChild(fiber.dom);
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}
//并发模式

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    // performUnitOfWork 会在执行完之后返回下一个任务的引用
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    //剩余空闲时间<1
    shouldYield = deadline.timeRemaining() < 1;
  }
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  // 跳出循环后, 在下一个空闲继续执行任务, 直到任务执行完毕;
  requestIdleCallback(workLoop);
}
requestIdleCallback(workLoop);
function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  const children = fiber.props.children;
  let prevSibling;
  children.forEach((child, index) => {
    const newFiber = {
      type: child.type,
      props: child.props,
      parent: fiber,
      dom: null,
    };
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
  });
  //第四步:查找下一个工作单元
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

const Didact = {
  createElement,
  render,
};

const App = Didact.createElement(
  "div",
  { id: "foo" },
  Didact.createElement("a", null, "bar"),
  Didact.createElement("b")
);

Didact.render(App, document.querySelector("#root"));
