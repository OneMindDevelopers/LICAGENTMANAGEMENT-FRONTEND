import React, { Component } from "react";
import { getCatagories } from "../services/fakeCatagoryService";

class Demo extends Component {
  state = {
    name: "Rahul",
    age: 21,
    items: [],
  };

  componentDidMount = () => {
    const items = [...getCatagories()];
    this.setState({ items });
  };

  render() {
    const { items } = this.state;
    return (
      <>
        <ul>
          {items.map((item) => (
            <li>{item.name}</li>
          ))}
          <h1>Name:{this.props.customername}</h1>
        </ul>
      </>
    );
  }
}

export default Demo;
