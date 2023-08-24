# 浏览器需要处理的文件

## JavaScript 的打包：

将 ES6 转换成 ES5 的语法；
TypeScript 的处理，将其转换成 JavaScript；

## Css 的处理：

CSS 文件模块的加载、提取；
Less、Sass 等预处理器的处理；

## 资源文件 img、font：

图片 img 文件的加载；
字体 font 文件的加载；

## HTML 资源的处理：

打包 HTML 资源文件；

# webpack 配置步骤

## 基本安装

`npm init -y`
`npm install webpack webpack-cli --save-dev`

## 指定配置文件

webpack 默认会读取根目录下面的`webpack.config.js`,如果要使用其他名字就要使用`--config`来指定了
`webpack --config wk.config.js
`
配置输入,输出方式

```js
const path = require("path");
module.exports = {
  mode: "production",
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../dist"),
  },
};
```

css-loader 的使用
npm install css-loader -D

```js
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
```

认识 style-loader
npm install style-loader -D

```js
use: [
          {
            loader: "css-loader",
            loader:"style-loader"
          },
        ],
```

less-loader 处理
npm install less-loader -D

```js
module: {
    rules: [
      {
        test: /\.css$/,
        // loader:"css-loader"第一种写法
        // use:["css-loader"]第二种写法
        use: [
          {

            loader: "css-loader",
            loader:"style-loader",
            loader: "less-loader",
          },
        ],
      },
    ],
  },
```

postcss-loader
因为 postcss 需要有对应的插件才会起效果，所以我们需要配置它的 plugin
npm install postcss-loader -D
npm install autoprefixer -D

```js
module: {
    rules: [
      {
        test: /\.css$/,
        // loader:"css-loader"第一种写法
        // use:["css-loader"]第二种写法
        use: [
          {

            loader: "css-loader",
            loader:"style-loader",
            loader: "less-loader",
            {
              loader: "postcss-loader",
              options: {
              postcssOptions: {
              plugins: ["autoprefixer"]
                }
            }
          },
        ],
      },
    ],
  },
```

postcss-preset-env 是用来替代上面的两个的

```js
module: {
  rules: [
    {
      // 告诉webpack匹配什么文件
      test: /\.css$/,
      // use: [ // use中多个loader的使用顺序是从后往前
      //   { loader: "style-loader" },
      //   { loader: "css-loader" }
      // ],
      // 简写一: 如果loader只有一个
      // loader: "css-loader"
      // 简写二: 多个loader不需要其他属性时, 可以直接写loader字符串形式
      use: [
        "style-loader",
        "css-loader",
        "postcss-loader",
        // {
        //   loader: "postcss-loader",
        //   options: {
        //     postcssOptions: {
        //       plugins: [
        //         "autoprefixer"
        //       ]
        //     }
        //   }
        // }
      ],
    },
    {
      test: /\.less$/,
      use: ["style-loader", "css-loader", "less-loader", "postcss-loader"],
    },
  ];
}
```

根目录下创建 postcss.config.js

```js
module.exports = {
  plugins: ["postcss-preset-env"],
};
```

## 到此对 css 的处理配置全部完成

处理图片就不需要使用 loader 了
资源模块类型(asset module type)

```js
{
        test: /\.(png|jpe?g|svg|gif)$/,
        // 1.打包两张图片, 并且这两张图片有自己的地址, 将地址设置到img/bgi中
        // 缺点: 多图片加载的两次网络请求
        // type: "asset/resource",

        // 2.将图片进行base64的编码, 并且直接编码后的源码放到打包的js文件中
        // 缺点: 造成js文件非常大, 下载js文件本身消耗时间非常长, 造成js代码的下载和解析/执行时间过长
        // type: "asset/inline"

        // 3.合理的规范:
        // 3.1.对于小一点的图片, 可以进行base64编码
        // 3.2.对于大一点的图片, 单独的图片打包, 形成url地址, 单独的请求这个url图片
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 60 * 1024
          }
        },
        generator: {
          // 占位符
          // name: 指向原来的图片名称
          // ext: 扩展名
          // hash: webpack生成的hash
          filename: "img/[name]_[hash:8][ext]"
        }
      }
```

babel

```js
{
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            // options: {
            //   plugins: [
            //     "@babel/plugin-transform-arrow-functions",
            //     "@babel/plugin-transform-block-scoping"
            //   ]
            // }
          }
        ]
      },
```

创建 babel.config.js 文件

```js
module.exports = {
  // plugins: [
  //   "@babel/plugin-transform-arrow-functions",
  //   "@babel/plugin-transform-block-scoping"
  // ]
  presets: ["@babel/preset-env"],
};
```

resolve 模块解析
extensions 是解析到文件时自动添加扩展名

```js
 resolve: {
    extensions: [".js", ".json", ".vue", ".jsx", ".ts", ".tsx"],
    alias: {
      utils: path.resolve(__dirname, "./src/utils")
    }
  },
```

vue 解析配置

```js
      {
        test: /\.vue$/,
        loader: "vue-loader"
      }
      plugins: [
    new VueLoaderPlugin()
  ]
```

CleanWebpackPlugin
npm install clean-webpack-plugin -D

```js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
```

HtmlWebpackPlugin
npm install html-webpack-plugin -D

Mode 配置
webpack-dev-server 配置
npm install webpack-dev-server -D

```js
  devServer: {
    hot: true,
    // host: "0.0.0.0",
    // port: 8888,
    // open: true
    // compress: true
  },
```

区分开发和生成环境配置
npm install --save-dev webpack-merge

```js
// 在文件中导入 `webpack-marge` 模块
const { merge } = require("webpack-merge");
// 导入公共文件
const common = require("./webpack.common.js");
// 使用
module.exports = merge(common, {
  mode: "production",
});
```
