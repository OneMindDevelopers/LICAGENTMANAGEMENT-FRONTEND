import React, { Component } from "react";

class Input extends Component {
  render() {
    const { name, label, type,value, handleValueChange,error } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          className="form-control"
          onChange={handleValueChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Input;
