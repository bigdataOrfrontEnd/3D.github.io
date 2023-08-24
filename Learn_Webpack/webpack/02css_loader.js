const path = require("path");
module.exports = {
  mode: "production",
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // loader:"css-loader"第一种写法
        // use:["css-loader"]第二种写法
        use: [
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
};
