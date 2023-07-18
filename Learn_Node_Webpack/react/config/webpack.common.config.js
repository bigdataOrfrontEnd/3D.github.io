// 公共配置文件
//加载path模块用来确定路径
const path = require("path");
module.exports = {
  entry: {
    app: "./src/app.js",
  },
  output: {
    filename: "js/bundle.js",
    path: path.resolve(__dirname, "../dist"),
  },
};
