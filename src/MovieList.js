import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DisplayMovie } from "./DisplayMovie";
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import Counter from "./Counter";
import InfoIcon from '@mui/icons-material/Info';
import { Formik, useFormik } from "formik";
import * as yup from "yup"

import "./style.css"


export function MovieList() {
  const history = useHistory();

  let style = {paddingLeft : "20px"}
  const [moviesList, setMoviesList] = useState([]);
  useEffect(()=>{
    fetch('https://6188ad38d0821900178d748d.mockapi.io/movies')
    .then(data => data.json())
    .then(movies => setMoviesList(movies))
  }, [])

  let getApi = () => {
    fetch('https://6188ad38d0821900178d748d.mockapi.io/movies')
    .then(data => data.json())
    .then(movies => setMoviesList(movies))
  }

  const [styleForSummary, setStyleForSummary] = useState("block");
  let styles = { display: styleForSummary };

  const deleteMovie = (id) => {
    fetch('https://6188ad38d0821900178d748d.mockapi.io/movies/'+id, {
      method: 'DELETE',
      headers: {
          'Content-type': 'application/json'
      }
  }).then(data => data.json())
  .then(dataJson => {
    getApi()
  })
  
  }

  return (
    <div>
      <li style = {style} type = "none">
        <Link to = "/AddMovie">Add Movie</Link>
      </li>
      <div className="movie-list">
        {moviesList.map((e) => (
          <div className="movie-container">
          <img className="movie-poster" src={e.poster} alt={e.name} />
          <div className="movie-specs">
            <h3 className="movie-name">{e.name}
              <InfoIcon onClick={() => history.push("/MovieDetails/" + e.id)}></InfoIcon>
            </h3>
            <p className="movie-rating">
              <span aria-label="" role="img">
                ⭐
              </span>
              {e.rating}
            </p>
          </div>
          <Button variant="contained" onClick={() => setStyleForSummary(styleForSummary == "none" ? "block" : "none")}>{styleForSummary == "none" ? "show descriptoin" : "hide description"}</Button>
          <p style={styles}>{e.summary}</p>
          <Button variant="contained" onClick={() => {deleteMovie(e.id)}}>Delete</Button>
          <Button variant="outlined" onClick={() => history.push("/editMovie/" + e.id)}>Edit</Button>
          <Counter />
        </div>
        ))}
      </div>
    </div>
  );

}

export function AddMovie() {
  const [moviesList, setMoviesList] = useState([]);
  // const [name, setName] = useState("");
  // const [poster, setPoster] = useState("");
  // const [rating, setRating] = useState("");
  // const [summary, setSummary] = useState("");
  // let data = { name, poster, rating, summary }; // when key n value's variable name are same example {name : name, poster: poster} then it can be written as {name, poster}}
  const history = useHistory();
  useEffect(()=>{
    fetch('https://6188ad38d0821900178d748d.mockapi.io/movies')
    .then(data => data.json())
    .then(movies => setMoviesList(movies))
  }, [])

  let setMovie = ({name, poster, rating, summary}) => {
      let data = { name, poster, rating, summary };
      fetch('https://6188ad38d0821900178d748d.mockapi.io/movies', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json'
      }
      }).then(data => data.json())
      .then(dataJson => history.push("/Movies"));
   


    setMoviesList([...moviesList, data]);
    // setName("");
    // setPoster("");
    // setRating("");
    // setSummary("");
  };
  const movieValidationSchema = yup.object({
    name : yup
    .string("enter a string")
    .min(3, "enter valid name")
    .required(),
    rating :  yup
    .number("enter a number")
    .min(1)
    .max(10)
    .required()
  })
  const {handleSubmit, handleChange, handleBlur, values, errors, touched  } = useFormik({
    initialValues : {
      name:'good', 
      poster:'',
      rating: '',
      summary: '',
      trailer: ''
    },
    validationSchema : movieValidationSchema,
    onSubmit :  (values) => 
      {
        setMovie(values)
        //history.push("/Movies")
      } 

    })

  return(
    <div>
      <form onSubmit = {handleSubmit}>
      <div className="inputCollection">
        <TextField  label="name" variant="outlined" 
        id = "name"
        name = "name"
        value = {values.name}
        onChange={handleChange}
        onBlur = {handleBlur}
        error = {errors.name}
        helperText = {errors.name} />
        <TextField label="img" variant="outlined"
        id = "poster"
        name = "poster"
        value = {values.poster} 
        onChange={handleChange}
        onBlur = {handleBlur}
        error = {errors.poster}
        helperText = {errors.poster} />
        <TextField  label="rating" variant="outlined" 
        id = "rating"
        name = "rating"
        value = {values.rating}
        onChange={handleChange}
        onBlur = {handleBlur}
        error = {errors.rating}
        helperText = {errors.rating}
          />
        <TextField  label="summary" variant="outlined"
        id = "summary"
        name = "summary"
        value = {values.summary}
        onChange={handleChange}
        onBlur = {handleBlur} 
        error = {errors.summary}
        helperText = {errors.summary} />
        <Button variant="contained" type = "submit" >Add Movies</Button>
      </div>
      </form>
    </div>

  );
}
  
