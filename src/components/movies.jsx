import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {getGenres} from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import { deleteMovie } from "../services/movieServices";
import { paginate } from "../utils/paginate";
import ListGroup from "./list-group";
import MoviesTable from "./moviesTable";
import auth from '../services/authService';
import Pagination from "./pagination";
import Search from "./search";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
    currentGenre: { _id: "", name: "All Genres" },
    searchTxt: "",
  };

  componentDidMount = async () => {
    const movies = getMovies();
    console.log(movies);
    let genres = getGenres();
    genres = [{ _id: "", name: "All Genres" }, ...genres];
    this.setState({ movies, genres });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].isLike = !movies[index].isLike;
    this.setState({ movies });
  };

  handleDelete = async (movie) => {
    const originalMovies = [...this.state.movies];
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        alert("Movie is invalid");
      } else if (ex.response && ex.response.status >= 400 && ex.response.status <= 500) {
        alert("Sorry Access Denied You need to have a admin access to continue...")
      }
      this.setState({ movies: originalMovies });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = (genre) => {
    this.setState({ currentGenre: genre, currentPage: 1, searchTxt: "" });
  };

  handleRaiseSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearchValue = (searchTxt) => {
    this.setState({ searchTxt, currentGenre: { _id: "", name: "All Genres" } });
  };

  render() {
    const {
      movies: allMovies,
      sortColumn,
      currentPage,
      pageSize,
      genres,
      currentGenre,
      searchTxt,
    } = this.state;
    const user = auth.getCurrentUser();
    let filteredMovies = allMovies;
    if (searchTxt) {
      filteredMovies = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchTxt.toLowerCase())
      );
    } else {
      filteredMovies =
        currentGenre && currentGenre._id
          ? allMovies.filter((m) => m.genre._id === currentGenre._id)
          : allMovies;
    }

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const paginatedMovies = paginate(sortedMovies, currentPage, pageSize);
    if (allMovies.length === 0) return <h1>There are no movies in the list</h1>;
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            currentGenre={currentGenre}
            handleGenreChange={this.handleGenreChange}
          />
        </div>
        <div className="col">
          <h1>
            There are {filteredMovies.length} number of movies in the page
          </h1>
          <Search
            value={searchTxt}
            handleSearchValue={this.handleSearchValue}
          />
          {user && <Link
            to="/movies/new"
            className="btn btn-small btn-primary"
            style={{ float: "left" }}
          >
            New
          </Link>}
          <MoviesTable
            paginatedMovies={paginatedMovies}
            handleLike={this.handleLike}
            handleDelete={this.handleDelete}
            sortColumn={sortColumn}
            raiseSort={this.handleRaiseSort}
          />
          <Pagination
            items={filteredMovies}
            currentPage={currentPage}
            pageSize={pageSize}
            handlePageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
