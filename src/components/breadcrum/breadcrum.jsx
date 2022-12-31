import React, { Component } from "react";

class BreadCrum extends Component {
  render() {
    const { label } = this.props;
    return (
      <nav>
        <ol className="breadcrumb custom-breadcrum-styles">
          <li className="breadcrumb-item">
            <a
              href="/login"
              onClick={() => {
                localStorage.removeItem("token");
              }}
            >
              Home
            </a>
          </li>
          <li className="breadcrumb-item active">{label}</li>
        </ol>
      </nav>
    );
  }
}

export default BreadCrum;
