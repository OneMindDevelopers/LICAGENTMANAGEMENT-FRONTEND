import React, { Component } from "react";
import Demo from "./demo1";

class Thankyou extends Component {
  state = {
    name: "Abhi1234",
  };
  render() {
    const { match, customername } = this.props;
    return (
      <>
        <h1>Thank you</h1>
        <div>Params:{match.params.id}</div>
        <div>Thank you {customername} please visit again</div>
        <Demo customername={this.state.name} />
      </>
    );
  }
}

export default Thankyou;
