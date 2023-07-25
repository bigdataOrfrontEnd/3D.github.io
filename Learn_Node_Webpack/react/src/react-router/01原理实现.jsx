import React, { Component } from "react";

export class ReactRouter extends Component {
  render() {
    return (
      <div>
        <h1>主页面</h1>
        <Home></Home>
        <Pfifle></Pfifle>
      </div>
    );
  }
}

export default ReactRouter;
class Home extends Component {
  render() {
    return <div>Home</div>;
  }
}

class Pfifle extends Component {
  render() {
    return <div>Pfifle</div>;
  }
}
class HomeRencoment extends Component {
  render() {
    return <div>HomeRencoment</div>;
  }
}
class HomeRazing extends Component {
  render() {
    return <div>HomeRazing</div>;
  }
}
