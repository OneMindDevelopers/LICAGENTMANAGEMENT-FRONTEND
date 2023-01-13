import React, { Component } from "react";

class TextArea extends Component {
  render() {
    const { name, label, value, handleValueChange, error } = this.props;
    return (
      <div className="form-floating">
        <label className="form-label" htmlFor={name}>
          {label}
        </label>
        <TextArea
          id={name}
          value={value}
          className="form-control"
          onChange={handleValueChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default TextArea;
