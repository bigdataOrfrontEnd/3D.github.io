import React, { Component } from "react";
import { UserContex } from "./Context.jsx";
// 步骤
// 1. 创建一个Context对象,然后把要生成数据的用生产者,要使用数据的包装成消费者
// 1. 创建Context,在另外一个文件中创建然后引入就行

export class Contee extends Component {
  constructor() {
    super();
    this.state = {
      liver: 1,
      name: "nihh",
    };
  }
  render() {
    return (
      <div>
        <UserContex.Provider value={this.state}>
          <Chile></Chile>
        </UserContex.Provider>
      </div>
    );
  }
}
//来一个组件
function Chile() {
  return (
    <div>
      <UserContex.Consumer>
        {(value) => {
          return <div>{value.name}</div>;
        }}
      </UserContex.Consumer>
    </div>
  );
}

export default Contee;
