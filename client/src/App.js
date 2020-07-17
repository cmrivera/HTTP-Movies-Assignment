import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from "axios";
import UpdateMovie from "./Movies/updateMovie";
import AddMovie from "./Movies/addMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [refresh, setRefresh] = useState(true);

  //component to get Movie List from api for the app

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.response))
      .finally(() => {
        setRefresh(false);
      });
  };

  //add to saved movie list, set saved list
  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [refresh]);

  //routes to each path needed for movielist, savedlist, addMovie
  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} setRefresh={setRefresh} />
      </Route>
      <Route path="/update-movie/:id">
        <UpdateMovie setMovieList={setMovieList} setRefresh={setRefresh} />
        <Route path="/addMovie" component={AddMovie} />
      </Route>
      <AddMovie />
    </>
  );
};

export default App;
