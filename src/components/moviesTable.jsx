import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import Like from "./like";
import Table from "./table";
class MoviesTable extends Component {
  columns = [
    {
      id: "title",
      label: "Title",
      content: (movie) => <Link to={`movies/${movie._id}`}>{movie.title}</Link>,
    },
    { id: "genre.name", label: "Genre" },
    { id: "numberInStock", label: "NumberInStock" },
    { id: "dailyRentalRate", label: "DailyRentalRate" },
    {
      key: "Like",
      content: (movie) => (
        <Like
          isLike={movie.isLike}
          handleLike={() => {
            this.props.handleLike(movie);
          }}
        />
      ),
    },
  ];

  deleteColumn = () => {
    return {
      key: "Delete",
      content: (movie) => (
        <button
          className="btn btn-danger btn-small"
          onClick={() => {
            this.props.handleDelete(movie);
          }}
        >
          Delete
        </button>
      ),
    };
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn());
    }
  }

  raiseSort = (column) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === column) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = column;
      sortColumn.order = "asc";
    }
    this.props.raiseSort(sortColumn);
  };

  render() {
    const { paginatedMovies: items, sortColumn } = this.props;
    return (
      <div>
        <Table
          items={items}
          sortColumn={sortColumn}
          columns={this.columns}
          raiseSort={this.raiseSort}
        />
      </div>
    );
  }
}

export default MoviesTable;
