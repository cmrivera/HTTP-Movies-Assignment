import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

//create update component and assign useHistory and useParams for push and our ID
//create useState for Movie and setMovie for when updating
const UpdateMovie = () => {
  const { push } = useHistory();
  const { id } = useParams();

  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: [],
  });

  //create handleSubmit to send update to api server when submitted
  const handleSubmit = (e) => {
    axios.put("http://localhost:5000/api/movies/${id}", movie);
    push("/movies/${movie.id}");
  };

  //create handleChange to setMovie, controls updating targeted values persist to localStorage so it saves infor

  const handleChange = (e) => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === "stars") {
      value = value.split(",");
    }
    if (e.target.name === "metascore") {
      value = parseInt(value, 10);
    }

    setMovie({
      ...movie,
      [e.target.name]: value,
    });
  };

  // create useEffect to get new api data once it is updated,set using movie id
  useEffect(() => {
    axios.get("http://localhost:5000/api/movies/${id}").then((res) => {
      setMovie(res.data);
    });
  }, [id]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={movie.title}
        />
        <br />
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={movie.title}
        />
        <br />
        <input
          type="text"
          name="star"
          onChange={handleChange}
          value={movie.stars}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};
export default UpdateMovie;
