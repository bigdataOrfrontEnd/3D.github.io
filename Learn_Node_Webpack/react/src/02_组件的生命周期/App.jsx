import React, { Component } from "react";

export class AppE extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    const cav = document.querySelector("#canvas");
    console.log(cav);
  }
  render() {
    return (
      <div>
        <canvas id="canvas"></canvas>
      </div>
    );
  }
}

export default AppE;
