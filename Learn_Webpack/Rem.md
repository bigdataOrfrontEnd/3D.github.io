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
