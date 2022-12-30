import React, { Component } from "react";

class Input extends Component {
  render() {
    const { name, label, type,value, handleValueChange,error,placeholderText } = this.props;
    return (
      <div className="form-group">
        <label className="form-label" htmlFor={name}>{label}</label>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          className="form-control"
          onChange={handleValueChange}
          placeholder={placeholderText}
          style={{width:'300px',margin:'0 auto'}}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Input;
