import React, { Component } from "react";

export class Class extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { meaage } = this.props;
    return <div>{meaage}</div>;
  }
}

export default Class;
