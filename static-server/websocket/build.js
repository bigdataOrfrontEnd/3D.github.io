// const koa = require("koa");
// const koaRouter = require("@koa/router");
// const app = new koa();
// const http = require("http");
// const Ws = require("./util/ws");
// const userRouter = new koaRouter();
// const server = http.createServer(app.callback());
// const webpack = new Ws();
// userRouter.get("/", (ctx, next) => {
//   ctx.body = [
//     {
//       name: "why",
//       age: 18,
//       score: 00,
//     },
//   ];
// });
// app.use(userRouter.routes());
// webpack.init(server);
// app.listen(3002, () => {
//   console.log("服务启动成功，端口号:3002");
// });
// app.js
const http = require("http");
const Koa = require("koa");
const WebSocket = require("ws");
const koaRouter = require("@koa/router");
const app = new Koa();
const userRouter = new koaRouter();
const WebSocketApi = require("./util/ws"); //引入封装的ws模块

const server = http.createServer(app.callback());

const wss = new WebSocket.Server({
  // 同一个端口监听不同的服务
  server,
});
userRouter.get("/", (ctx, next) => {
  ctx.body = [
    {
      name: "why",
      age: 18,
      score: 00,
    },
  ];
});
app.use(userRouter.routes());

WebSocketApi(wss);

server.listen(3002);
console.log("服务启动成功，端口号:3002 ");
