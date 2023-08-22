//用来请求数据的组件
import React, { Component } from "react";
import { connect } from "react-redux";
import { ActionBanners } from "../store/actionCreators";
import axios from "axios";
export class Category extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    // http://123.207.32.32:8000/home/multidata
    axios.get("http://123.207.32.32:8000/home/multidata").then((res) => {
      const banners = res.data.data.banner.list;
      console.log(banners);
      this.props.ChnageBanners(banners);
    });
  }
  render() {
    return <div>Category</div>;
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    ChnageBanners: (banners) => dispatch(ActionBanners(banners)),
  };
};

export default connect(null, mapDispatchToProps)(Category);
