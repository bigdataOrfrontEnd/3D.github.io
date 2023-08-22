// 生产环境配置文件
const { merge } = require("webpack-merge"); //合并webpack配置
const common = require("./webpack.common.config"); //加载公用webpack配置
const HtmlWebpackPlugin = require("html-webpack-plugin"); //注入html模版和js
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //打包时候删除以前的
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //打包css样式
const TerserPlugin = require("terser-webpack-plugin"); //压缩JS文件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = merge(common, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.(sass|scss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
      inject: "body",
      minify: {
        removeComments: true,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "style/[name].[hash:6].css",
    }),
  ],
  optimization: {
    minize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // 屏蔽log
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
});
