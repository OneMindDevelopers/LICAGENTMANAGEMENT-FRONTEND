import React from "react";
import Joi from "joi-browser";
import Form from "../forms/form";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieServices";

class MoviesForm extends Form {
  state = {
    genres: [],
    data: {
      title: "",
      genre: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genre: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().required().label("NumberInstock"),
    dailyRentalRate: Joi.number().required().label("DailyRentalRate"),
  };

  poupulateGenres = async () => {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  };

  populateMovies = async () => {
    try {
      const paramId = this.props.match.params.id;
      if (paramId === "new") return;
      const { data: movie } = await getMovie(paramId);
      this.setState({ data: this.mapMovieToData(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.push("/not-found");
      }
    }
  };

  componentDidMount = async () => {
    await this.poupulateGenres();
    await this.populateMovies();
  };

  mapMovieToData = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genre: movie.genre.id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  doSubmit = async () => {
    try {
      await saveMovie(this.state.data);
      this.props.history.push("/");
    } catch(ex) {
      if(ex.response && ex.response.status >= 400 && ex.response.status <= 500) {
        alert("Sorry Access Denied You need to have a admin access to continue...");
      }
    }
  };

  render() {
    const { genres } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.displayInput("title", "Title")}
          {this.displaySelect("genre", "Genre", genres)}
          {this.displayInput("numberInStock", "NumberInStock", "number")}
          {this.displayInput("dailyRentalRate", "DailyRentalRate", "number")}
          {this.displayButton("Save")}
        </form>
      </div>
    );
  }
}

export default MoviesForm;
