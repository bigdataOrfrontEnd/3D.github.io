import React, { Component } from "react";
import { connect } from "react-redux";
import { AddCoutAction } from "../store/actionCreators";
export class About extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  componentDidUpdate() {
    console.log(this.props.banners);
  }
  render() {
    return (
      <div>
        About:{this.props.couter}
        <button onClick={(e) => this.props.addNumber(+1)}>+1</button>
        {this.props.banners.map((item, index) => {
          return <div key={index}>{item.title}</div>;
        })}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    couter: state.couter,
    banners: state.banners,
  };
};
// function mapDispatchToProps(dispatch) {
//   return {
//     addNumber: function (num) {
//       return dispatch(AddCoutAction(num));
//     },
//   };
// }
const mapDispatchToProps = (dispatch) => {
  return {
    addNumber: (num) => dispatch(AddCoutAction(num)),
  };
};
//context()返回值是一个高阶组件
export default connect(mapStateToProps, mapDispatchToProps)(About);
