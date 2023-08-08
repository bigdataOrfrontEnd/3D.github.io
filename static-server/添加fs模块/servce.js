const http = require("http");
const fs = require("fs");
//通过fs.readFileSync读取文件内容
const html = fs.readFileSync("./index.html");
const server = http.createServer((req, res) => res.end(html));
server.listen(3000, () => {
  console.log("3000");
});
