## 实现 createElement 函数

## 实现 render 方法

## Concurrent Mode

递归调用有个问题，一旦开始执行，将不能中断，如果有一个非常巨大的 DOM 树，主线程会一直处于繁忙中。这个时候浏览器不能响应用户事件和流畅的动画，直到递归执行完毕。
所以需要将任务划分为更小的执行单元，如果浏览器有优先级更高的任务，可以中断当前任务，将控制权交还给浏览器。
可以使用 requestIdleCallback 实现，它在浏览器空闲的时候会自动执行任务。它会传递一个 deadline 参数，告诉我们浏览器还有多少空闲的时间，我们需要在这之前中断任务的执行。

## Fibers

## Render 和 Commit 阶段

## Reconciliation 阶段

## 函数式组件

## Hooks
