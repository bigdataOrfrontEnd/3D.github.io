import React, { Component } from "react";
import ChildCpn from "./ChildCpn.jsx";
import "./index.less";

function Header(props) {
  const { name } = props;

  return (
    <div className="tabl">
      {name.map((item) => {
        return <div key={item}>{item}</div>;
      })}
    </div>
  );
}
function Main() {
  return <div>Main</div>;
}
class Foord extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>{this.props.name}</div>;
  }
}

export class Aec extends Component {
  constructor() {
    super();
    this.state = {
      message: "你好",
      //   tabar: [],
      index: 0,
    };
  }

  render() {
    const { tabar, index } = this.state;
    return (
      <div>
        {/* <Header name={tabar}></Header>
        <Main></Main>
        <Foord name={this.state.message}></Foord>
        <button onClick={(e) => this.onclick()}>修改文本</button>
        <h2>父组件拥有的数据</h2> */}
        <h2>子传父通信并验证,并且父组件根据子组件的值改变</h2>
        <ChildCpn tabar={tabar} setIndex={(index) => this.setIndex(index)} />
        {/* <div>{tabar[index]}</div> */}
      </div>
    );
  }
  onclick() {
    this.setState({
      message: "修改了",
    });
  }
  setIndex(index) {
    console.log("index", index);
    this.setState({
      index: index,
    });
  }
}

export default Aec;
