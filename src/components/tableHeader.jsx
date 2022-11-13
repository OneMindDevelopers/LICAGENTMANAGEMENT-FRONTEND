import React, { Component } from "react";

class TableHeader extends Component {

   renderSortIcon = (column) =>{
    const sortColumn = {...this.props.sortColumn};
    if(sortColumn.path !== column.id) return null;
    if(sortColumn.order === 'asc') return <i className="fa fa-sort-asc"></i>;
    if(sortColumn.order === 'desc') return <i className="fa fa-sort-desc"></i> 
   } 

  render() {
    const { columns, raiseSort } = this.props;
    return (
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.id || column.key}
                onClick={() => {
                  raiseSort(column.id);
                }}
              >
                {column.label} {this.renderSortIcon(column)}
              </th>
            ))}
          </tr>
        </thead>
    );
  }
}

export default TableHeader;
