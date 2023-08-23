console.log("js加载");
let dragging = false; //元素是否在拖动中的标识
let cloneEl = null; //克隆元素
let initial = {}; //初始化数据记录
//1. 事件委托机制
document.getElementById("list").addEventListener("mousedown", function (e) {
  console.log("mousedown");

  e.preventDefault();
  // contains()若传入的参数 token 包含在列表中时则返回true，否则返回 false。
  // 1.2  克隆一个绝对定位的元素,并标识为拖拽中的状态.
  if (e.target.classList.contains("item") && !cloneEl) {
    //将鼠标变为小手
    document.getElementById("app").classList.add("active");
    cloneEl = e.target.cloneNode(true); //克隆元素
    cloneEl.classList.add("flutter"); //添加样式让其浮动
    e.target.parentElement.appendChild(cloneEl); //将克隆的元素加入列表
    dragging = true;
    e.target.classList.add("hide");
    const fakeSize = parseInt(100 * randomNum(3, 5)); //模拟随机大小的原图
    // 1.3可以封装为一个初始化方法
    initial = {
      offsetX: e.offsetX,
      offsetY: e.offsetY,
      pageX: e.pageX,
      pageY: e.pageY,
      width: e.target.offsetWidth,
      fakeSize,
      flag: Math.random(),
    };
  }
});
//2.鼠标拖动监听事件
window.addEventListener("mousemove", (e) => {
  if (dragging && cloneEl) {
    // 2.1
    // TODO: 处理元素的移动：改变 left top 定位
    // x 轴（left）计算方法：e.clientX - initial.offsetX
    // y 轴（top）计算方法：e.clientY - initial.offsetY
    const options = [
      `left:${e.pageX - initial.offsetX}px`,
      `top:${e.pageY - initial.offsetY}px`,
    ];
    changeStyle(options);
  }
});
//4.在目标区域抬起
document.getElementById("content").addEventListener("mouseup", (e) => {
  //当鼠标进入目标区域,并松开鼠标,将此时的鼠标位置信息给图片
  done(e.offsetX, e.offsetY);
});
// 3. 鼠标抬起
window.addEventListener("mouseup", (e) => {
  //标识符关闭
  dragging = false;
  if (cloneEl) {
    cloneEl.classList.add("is_returen"); //加上过度动画
    //设置元素的初始位置
    changeStyle([`left:${initial.offsetX}px`, `top:${initial.offsetY}px`]);
  }
  setTimeout(() => {
    cloneEl.remove(); //移除克隆的元素
  }, 300);
});
//完成处理
function done(x, y) {
  console.log(x, y);
  // 没有克隆元素,进入这个区域松开鼠标也没用
  if (!cloneEl) return;
  const newEl = cloneEl.cloneNode(true);
  newEl.classList.remove("flutter");
  // newEl.src = cloneEl.getAttribute("raw");
  newEl.style.cssText = `left:${x - initial.offsetX}px;top:${
    y - initial.offsetY
  }px;`;
  document.getElementById("content").appendChild(newEl);
  // cloneEl.remove();
  cloneEl = null; //移动完就把拷贝的元素删除
}
//将数组中的样式分解出来
function changeStyle(arr) {
  // 将浮动元素的样式分割放入数组中
  const original = cloneEl.style.cssText.split(";");
  original.pop();
  cloneEl.style.cssText = original.concat(arr).join(";") + ";";
}
function randomNum(n, m) {
  return Math.random() * (m - n) + n;
}
