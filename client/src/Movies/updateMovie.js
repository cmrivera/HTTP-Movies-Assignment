import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

//create initial values
const initialValues = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: "",
};

//update form component
const UpdateForm = (props) => {
  const { push } = useHistory();
  const { id } = useParams();
  const [movieValues, setMovieValues] = useState(initialValues);

  //useEffect to pull info from api for update and then setMovieValues, using id for useParams
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log(res);
        setMovieValues(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  //changeHandler to setMovie value for update

  const changeHandler = (e) => {
    e.persist();
    let name = e.target.name;
    let value = e.target.value;

    setMovieValues({
      ...movieValues,
      [name]: value,
    });
  };

  //handleSUbmit to prevent default reload
  //post updated info movie
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/movies/${id}`, movieValues)
      .then((res) => {
        console.log(res);
        props.setMovieValues(res.data);
        push(`/movie-list/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //update form
  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={movieValues.title}
        />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={movieValues.director}
        />

        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={movieValues.metascore}
        />

        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="stars"
          value={movieValues.stars}
        />

        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
