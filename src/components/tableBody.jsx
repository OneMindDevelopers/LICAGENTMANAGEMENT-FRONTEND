import _ from "lodash";
import React, { Component } from "react";

class TableBody extends Component {
  renderColumnData = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.id);
  };

  renderUniqueColumn = (item,column) => {
    return item._id + (column.id || column.key);
  }

  render() {
    const { items, columns } = this.props;
    return (
      <tbody>
        {items.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={this.renderUniqueColumn(item,column)}>{this.renderColumnData(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
