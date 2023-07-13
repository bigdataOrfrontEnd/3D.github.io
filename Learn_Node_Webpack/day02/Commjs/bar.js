// Commjsnode支持但是浏览器中是不支持的
//导出关键字
// exports
// 引入关键字
// require;
const nae = "小李";
function runnig() {
  console.log("hell");
}
//第一种导出方式
exports.nae = nae;
exports.runnig = runnig;
