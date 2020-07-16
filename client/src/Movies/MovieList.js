import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import axios from "axios";

export default class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    console.log("Mounted");
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => {
        console.log(res);
        this.setState({ movies: res.data });
      })
      .catch((err) => console.log(err.response));
  }

  render() {
    console.log("render the movie list");
    return (
      <div className="movie-list">
        {this.state.movies.map((movie) => (
          <Link to={`/movies/${movie.id}`}>
            <MovieCard key={movie.id} movie={movie} />
          </Link>
        ))}
      </div>
    );
  }
}
