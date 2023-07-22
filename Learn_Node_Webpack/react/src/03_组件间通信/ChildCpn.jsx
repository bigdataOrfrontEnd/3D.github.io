import React, { Component } from "react";

export class ChildCpn extends Component {
  static defaultProps = {
    tabar: ["首页", "精选", "订阅"],
    name: 10,
  };
  constructor(props) {
    super(props);
    this.state = {
      curentIndex: 0,
    };
  }
  render() {
    console.log(this.props.tabar);
    const { tabar } = this.props;
    const { curentIndex } = this.state;
    return (
      <div className="ChildBox">
        <div>{this.props.name}</div>
        {tabar.map((item, index) => {
          return (
            <div
              className={"Item" + (index === curentIndex ? " active" : "")}
              key={item}
              onClick={(e) => this.tabrt(index)}
            >
              {item}
            </div>
          );
        })}
      </div>
    );
  }
  tabrt(index) {
    this.setState({
      curentIndex: index,
    });

    this.props.setIndex(index);
  }
}

export default ChildCpn;
