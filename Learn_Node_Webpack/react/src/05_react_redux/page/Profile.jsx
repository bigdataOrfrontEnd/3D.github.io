import React, { Component } from "react";
import { store } from "../store/index";
import { AddCoutAction } from "../store/actionCreators";
export class Profile extends Component {
  constructor() {
    super();
    this.state = {
      cout: store.getState().couter,
    };
  }
  componentDidMount() {
    this.unsubscribue = store.subscribe(() => {
      this.setState({ cout: store.getState().couter });
    });
  }
  componentWillUnmount() {
    this.unsubscribue();
  }
  render() {
    const { cout } = this.state;
    return (
      <div className="Profile">
        <h2>Profile计数:{cout}</h2>
        <button onClick={(e) => this.inclred()}>-1</button>
        <button onClick={(e) => this.inscert()}>-5</button>
      </div>
    );
  }
  inclred() {
    store.dispatch(AddCoutAction(-1));
  }
  inscert() {
    store.dispatch(AddCoutAction(-5));
  }
}

export default Profile;
