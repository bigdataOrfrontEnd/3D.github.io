import React, { Component } from "react";
import Index from "./05_react_redux/index.jsx";

// import Contee from "./03_组件间通信/02非父子组件通信.jsx";
// import Aec from "./03_组件间通信/01_组件间的嵌套.jsx";
// import Class from "./01_类组件和函数组件/Class.jsx";
// import AppE from "./02_组件的生命周期/App.jsx";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      meaage: "hellow",
    };
  }
  render() {
    return (
      <div className="box">
        {/* <Aec /> */}
        {/* <Contee></Contee> */}
        <Index></Index>
      </div>
    );
  }
}
