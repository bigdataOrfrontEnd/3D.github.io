//引入方式
const { nae, runnig } = require("./bar");
console.log(nae);
runnig();
console.log();
module.exports = {
  nae,
  runnig,
};
