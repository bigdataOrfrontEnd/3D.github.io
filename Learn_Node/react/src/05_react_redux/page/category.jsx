//用来请求数据的组件
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchHomeMultidataAction } from "../store/actionCreators";

export class Category extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    // http://123.207.32.32:8000/home/multidata
    // 告诉我要发送一个网络请求,然后定义一个action去做网络请求,需要使用redux-thunk
    this.props.ChnageBanners();
  }
  render() {
    return <div>Category</div>;
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    ChnageBanners: () => dispatch(fetchHomeMultidataAction()),
  };
};

export default connect(null, mapDispatchToProps)(Category);
