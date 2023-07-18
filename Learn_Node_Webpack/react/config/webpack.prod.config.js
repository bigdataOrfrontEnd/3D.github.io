// 生产环境配置文件
const { merge } = require("webpack-merge");
const common = require("./webpack.common.config");
module.exports = merge(common, {
  mode: "production",
});
