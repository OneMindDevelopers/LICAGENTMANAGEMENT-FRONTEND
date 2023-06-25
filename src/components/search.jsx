import React, { Component } from "react";

class Search extends Component {
  render() {
    const {value,handleSearchValue} = this.props;
    return (
      <div className="form-group">
        <input
          type="search"
          name="query"
          value={value}
          className="form-control m-2"
          placeholder="Enter the Title to Search"
          onChange={(e) => {
            handleSearchValue(e.currentTarget.value);
          }}
        />
      </div>
    );
  }
}

export default Search;
