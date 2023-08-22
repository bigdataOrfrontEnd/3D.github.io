export function app(root) {
  const Elemet = document.querySelector(`#${root}`);
  //向这个元素里面添加一个文字
  Elemet.textContent = "hellow";
  return Elemet;
}
