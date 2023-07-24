import React, { Component } from "react";
import { connect } from "react-redux";
export class About extends Component {
  render() {
    return <div>About:{this.props.couter}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    couter: state.couter,
  };
};
//context()返回值是一个高阶组件
export default connect(mapStateToProps)(About);
