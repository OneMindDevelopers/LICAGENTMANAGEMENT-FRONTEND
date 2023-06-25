import React, { Component } from "react";
class LoginNavBar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar bg-light">
        <div className="container">
          <a className="navbar-brand">
            <h1 className="text-center" style={{marginLeft:'50%'}}>LIC AGENT MANAGEMENT SOFTWARE</h1>
          </a>
        </div>
      </nav>
    );
  }
}

export default LoginNavBar;
