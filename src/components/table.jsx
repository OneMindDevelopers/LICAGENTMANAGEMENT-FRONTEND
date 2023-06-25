import React, { Component } from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

class Table extends Component {
  render() {
    const { columns, raiseSort, sortColumn, items } = this.props;
    return (
      <table className="table">
        <TableHeader
          columns={columns}
          raiseSort={raiseSort}
          sortColumn={sortColumn}
        />
        <TableBody columns={columns} items={items} />
      </table>
    );
  }
}

export default Table;
