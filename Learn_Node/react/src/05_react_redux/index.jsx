// import { useState, react, useEffect } from "react";
import React, { Component } from "react";
import About from "./page/about.jsx";
import Home from "./page/Home.jsx";
import Profile from "./page/Profile.jsx";
import Category from "./page/category.jsx";
import { store } from "./store/index";
import { Provider } from "react-redux";
import "./style.less";
export class Index extends Component {
  constructor() {
    super();
    this.state = {
      cout: store.getState().couter,
    };
  }
  componentDidMount() {
    store.subscribe(() => {
      this.setState({
        cout: store.getState().couter,
      });
    });
  }
  render() {
    const { cout } = this.state;
    return (
      <Provider store={store}>
        <div className="box">
          <h2>首页计数{cout}</h2>
          <div className="main">
            <Home></Home>
            <Profile></Profile>
            <About></About>
            <Category></Category>
          </div>
        </div>
      </Provider>
    );
  }
}
export default Index;
