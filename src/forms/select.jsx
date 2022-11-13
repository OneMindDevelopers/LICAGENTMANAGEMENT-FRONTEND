import React, { Component } from "react";

class Select extends Component {
  render() {
    const { name, label, genres, value, handleValueChange, error } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select
          className="form-control"
          id={name}
          name={name}
          value={value}
          onChange={handleValueChange}
        >
          <option value=""></option>
          {genres.map((genre) => (
            <option key={genre._id} value={genre._id}>
              {genre.name}
            </option>
          ))}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Select;
