// 主要使用了http这个node,模块,主要是服务端API的使用
//req 用来获取客户端请求的相关信息，如request header；

const http = require("http");
const html = `

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div>helloword</div>
</body>
</html>
`;
const server = http.createServer((req, res) => res.end(html));
server.listen(3000, () => {
  console.log("3000");
});
