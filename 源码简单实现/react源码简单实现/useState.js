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
  //   const isProperty = (key) => key !== "children";
  //   Object.keys(fiber.props)
  //     .filter(isProperty)
  //     .forEach((name) => {
  //       dom[name] = fiber.props[name];
  //     });
  updateDom(dom, {}, fiber.props);
  return dom;
}
let nextUnitOfWork = null;
let wipRoot = null; //保存着对rootfiber的引用
let currentRoot = null; //在提交完成前,保存我们提交给DOM的最后一个Fiber tree
let deletions = null; //跟踪我们想要删除的节点
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
      children: [element], //此时的eleemnt还只是React.CreateElement函数创建的virtual dom树
    },
    alternate: currentRoot, //该属性保留着旧 fiber Tree的链接
  };
  deletions = [];
  //设置nextUnitOfWork为 Fiber 树的根
  nextUnitOfWork = wipRoot;
}
//向浏览器提交渲染
function commitRoot() {
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  // 创建一个变量去追踪fiber root 叫 wipRoot
  wipRoot = null;
}
// startsWith用于检测字符串是否以指定的子字符串开始
const isEvent = (key) => key.startsWith("on"); //如果事件处理程序发生更改，我们会将其从节点中删除
const isProperty = (key) => key !== "children" && !isEvent(key);
const isNew = (prev, next) => (key) => prev[key] !== next[key];
const isGone = (prev, next) => (key) => !(key in next);
//We compare the props from the old fiber to the props of
//the new fiber, remove the props that are gone,
//and set the props that are new or changed
//跟新操作主要是将旧的fiber和新的element进行比较
function updateDom(dom, prevProps, nextProps) {
  // 移除旧的或者改变的的event
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = "";
    });
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      dom[name] = nextProps[name];
    });
  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
}
//删除dom
function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child, domParent);
  }
}

//所有工作完成之后，有一个commit 操作
function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  let domParentFiber = fiber.parent;
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber.dom;
  //根据effectTag来进行真实的DOM操作
  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    // 添加
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    // 更新
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === "DELETION") {
    // 删除
    // domParent.removeChild(fiber.dom);
    commitDeletion(fiber, domParent);
  }

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
  const isFunctionComponent = fiber.type instanceof Function;
  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }
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
let wipFiber = null;
let hookIndex = null;
function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = [];
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}
function useState(initial) {
  const oldHook =
    wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[hookIndex];
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  };
  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action) => {
    hook.state = action(hook.state);
  });
  const setState = (action) => {
    hook.queue.push(action);
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
    };
    nextUnitOfWork = wipRoot;
    deletions = [];
  };
  wipFiber.hooks.push(hook);
  hookIndex++;
  return [hook.state, setState];
}
function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  reconcileChildren(fiber, fiber.props.children);
}
//这个函数就是将旧的fiber tree和新的元素做比较
function reconcileChildren(wipFiber, elements) {
  let index = 0;
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  let prevSibling = null;
  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber = null;
    // TODO compare oldFiber to element,比较旧的fiber和元素
    const sameType = oldFiber && element && element.type == oldFiber.type;
    if (sameType) {
      // TODO update the node
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE",
      };
    }
    if (element && !sameType) {
      // TODO add this node
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT",
      };
    }
    if (oldFiber && !sameType) {
      // TODO delete the oldFiber's node
      oldFiber.effectTag = "DELETION";
      deletions.push(oldFiber);
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    if (index === 0) {
      wipFiber.child = newFiber;
    } else if (element) {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
  }
}

const Dideact = {
  createElement,
  render,
  useState,
};

/** @jsx Dideact.createElement */
const container = document.getElementById("root");
function Counter() {
  const [state, setState] = Dideact.useState(1);
  return <h1 onClick={() => setState((c) => c + 1)}>Count: {state}</h1>;
}
const element = <Counter />;
Dideact.render(element, container);
