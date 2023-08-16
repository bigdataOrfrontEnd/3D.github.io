let root = document.querySelector("#root");
let nextUnitOfWork = null;
let fiber = {
  type: "div",
  props: {
    id: "div1",
    children: [
      {
        type: "div",
        props: {
          children: [
            {
              type: "div",
              props: {
                innerHTML: "里面",
              },
            },
          ],
        },
      },
      {
        type: "h3",
        props: {
          innerHTML: "里面",
        },
      },
    ],
  },
};

/**
 *工具函数
 */
function createDOM(fiber) {
  const dom =
    fiber.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);

  Object.keys(fiber.props)
    .filter((key) => key !== "children")
    .forEach((key) => (dom[key] = fiber.props[key]));

  return dom;
}

/**
 *2.render 的逻辑 
    2.1 初始化第一个工作UnitOfWork
    */

function render(element, container) {
  // Root Fiber
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    children: null,
    parent: null,
    sibling: null,
    // alternate: currentRoot,
  };
  // deletion = [];
  nextUnitOfWork = wipRoot;
}
//

/*
    上面的渲染不能停止.我们可以把任务给打成一个个小任务
    3.这次是并行渲染(conconstructor ) 
    Fiber：表示大的结构
    fiber：表示一个节点，fiber = js对象 

    优先级child ， sibling（兄弟） ，parent 。就是一个先序遍历
    第一个节点是render出来的，剩下的节点是 performUnitOfWork 出来的
*/

/*
    1.执行一个渲染任务单元
    2.创造新fiber
    3.返回下一个unitwork
*/
function performUnitOfWork(fiber) {
  // console.log(fiber)
  if (!fiber.dom) {
    fiber.dom = createDOM(fiber);
  }
  // 一开始 render 初始化了children，所以会回来
  if (fiber.parent) {
    fiber.parent.dom.append(fiber.dom);
  }
  const elements = fiber.props.children;
  let prevSibling = null;
  // 建立fiber之间的联系
  for (let i in elements) {
    const newFiber = {
      type: elements[i].type,
      props: elements[i].props,
      parent: fiber,
      dom: null,
      children: null,
      sibling: null,
    };
    // 只有第0个叫child，别的都叫做sibling
    // 第二个if是兄弟节点
    if (i == 0) {
      fiber.children = newFiber;
    } else {
      fiber.children.sibling = newFiber;
    }
    // console.log(newFiber, prevSibling)
  }
  //找儿子,深度一直跑。
  // console.log(fiber)
  if (fiber.children) {
    return fiber.children;
  }
  // 找兄弟
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    // 找爸爸
    nextFiber = nextFiber.parent;
  }
}
/*
改造成异步
*/
function workLoop(deadline) {
  // console.log(deadline.timeRemaining())
  let shouldRun = true;
  // 不忙的时候进行渲染,一直空闲就能一直跑这个循环
  while (nextUnitOfWork && shouldRun) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldRun = deadline.timeRemaining() > 1;
  }
  // 重新请求
  requestIdleCallback(workLoop);
}
render(fiber, root);
requestIdleCallback(workLoop);
