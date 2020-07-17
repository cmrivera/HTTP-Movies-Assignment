import React, { useState } from "react";
import axios from "axios";

//add movie component useSTate to set state
const AddMovie = (props) => {
  const [add, setAdd] = useState({
    title: "",
    director: "",
    metascore: "",
    actors: "",
  });

  //handleChange to aetAdded movie infor to list
  const handleChange = (e) => {
    setAdd({
      ...add,
      [e.target.name]: e.target.value,
    });
    console.log(add);
  };

  //handle submit to post added movie to api
  const handleSubmit = (e) => {
    axios
      .post(`http://localhost:5001/api/movies/`, add)
      .then((res) => {
        props.history.push("/");
      })
      .catch((err) => console.log(err));
    //e.preventDefault();
  };

  //addform
  return (
    <form onSubmit={handleSubmit}>
      <h1>{add.title}</h1>
      <p>{add.director}</p>
      <p>{add.metascore}</p>
      <p>{add.stars}</p>
      <input
        name="title"
        placeholder="Title"
        value={add.title}
        onChange={handleChange}
      />
      <input
        name="director"
        placeholder="Director"
        value={add.director}
        onChange={handleChange}
      />
      <input
        name="metascore"
        placeholder="Metascore"
        value={add.metascore}
        onChange={handleChange}
      />
      <input
        name="stars"
        placeholder="Stars"
        value={add.stars}
        onChange={handleChange}
      />
      <button> Add Movie</button>
    </form>
  );
};

export default AddMovie;
