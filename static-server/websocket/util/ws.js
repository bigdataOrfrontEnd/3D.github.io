// 不可以用代码
// const { WebSocket } = require("ws");
// class Ws {
//   init = (server) => {
//     console.log(server);
//     const wss = new WebSocket.Server({ server });
//     console.log("first", wss);
//     // this.wss = new WebSocketServer({ server });
//     wss.on("connection", (ws) => {
//       ws.on("message", this.onMessage);
//     });
//   };
//   onMessage = (msg) => {
//     console.log("收到客户端消息" + msg);
//   };
// }
// module.exports = Ws;
// 简单服务器
// const wss = new WebSocketServer({ port: 8080 });

// wss.on("connection", function connection(ws) {
//   ws.on("error", console.error);

//   ws.on("message", function message(data) {
//     console.log("received: %s", data);
//   });

//   ws.send("something");
// });

// util/ws.js
module.exports = (wss) => {
  console.log(wss);
  wss.on("connection", function connection(ws) {
    ws.on("message", onMessage);
    ws.on("error", onError);

    ws.send("something");
  });
};
//收到客户端消息
const onMessage = (msg) => {
  console.log("received: %s", msg);
};
const onError = () => {};
