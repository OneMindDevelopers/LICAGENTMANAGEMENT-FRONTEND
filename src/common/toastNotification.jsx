import React, { Component } from "react";

class ToastNotification extends Component {
  render() {
    const { message } = this.props;
    return (
      <div
        className="toast fade show text-bg-primary custom-translate-middle"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <svg
            className="bd-placeholder-img rounded me-2"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <rect width="100%" height="100%" fill="#007aff"></rect>
          </svg>

          <strong className="me-auto">{"LIC AGENT MANAGEMENT APP"}</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">{message}</div>
      </div>
    );
  }
}

export default ToastNotification;
