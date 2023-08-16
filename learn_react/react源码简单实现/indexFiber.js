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
//实现render函数,只实现向DOM中添加内容,不着急实现更新和删除
/**
 *
 * @param {*} element DOM元素
 * @param {*} container 挂载点
 */
function render(element, container) {
  //设置nextUnitOfWork为 Fiber 树的根
  nextUnitOfWork = {
    dom: container,
    props: {
      children: [element],
    },
  };

  //2. 将Dom元素挂载到root上
  container.appendChild(node);
}

//3. Concurrent Mode
let nextUnitOfWork = null;
//当空闲时间不足时候,中断当前任务,将控制权交给浏览器
requestIdleCallback(workLoop);
function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    // performUnitOfWork 会在执行完之后返回下一个任务的引用
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    //剩余空闲时间<1
    shouldYield = deadline.timeRemaining() < 1;
  }
  // 跳出循环后, 在下一个空闲继续执行任务, 直到任务执行完毕;
  requestIdleCallback(workLoop);
}

function performUnitOfWork(fiber) {
  // TODO add dom node
  // TODO create new fibers
  // TODO return next unit of work
  //第一步 根据fiber节点创建真实的dom节点,并保存在fiber.dom属性中
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  //第二步,将当前fiber节点的真实dom添加到父节点中,这一步可能造成浏览器回流重绘的
  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }
  //第三步,给子元素创建对应的fiber节点
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
