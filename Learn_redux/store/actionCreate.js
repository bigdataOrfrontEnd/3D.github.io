const { ChangeName } = require("./constens");
const changeNameAction = (name) => ({
  type: ChangeName,
  name,
});
module.exports = {
  changeNameAction,
};
