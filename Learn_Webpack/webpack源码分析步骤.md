第一步：下载 webpack 的源码 - https://github.com/webpack/webpack
第二步：安装项目相关的依赖 - npm i
第三步：编写自己的源代码 - 在 webpack 源码根目录下创建一个 why 文件夹
第四步：编写 webpack 的配置文件 ---在 why 文件夹下面创建 webpack.config.js,并将所需的配置都写上
第五步：编写启动的文件 build.js

```js
//webpack所有的有用的包都在lib下面
const webpack = require("../lib/webpack");
const config = require("./webpack.config");
const compiler = webpack(config);
compiler.run((err, stats) => {
  if (err) {
    console.error(err);
  } else {
    console.log(stats);
  }
});
```

第六步:node build.js 开始进行打包
vscode 调试 js 代码的方式
直接使用运行与调试工具,给代码打断点
