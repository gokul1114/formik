import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFormik } from 'formik';
import * as yup from "yup"



export default function EditMovies() {
    let {id}= useParams();
    console.log(id)
    let history = useHistory();
    const[movie, setMovie] = useState(null);
    // let setMovie = () => {
    //     setMoviesList(moviesList);
    //     // history.push("/Movies");
    
    //   };
    useEffect(()=>{
      fetch('https://6188ad38d0821900178d748d.mockapi.io/movies/'+id)
      .then(data => data.json())
      .then(movie => {
        console.log(movie)
        setMovie(movie)})

    }, [])
    
  return movie ? <EditMovieForm movie = {movie} /> : "" ;
}

function EditMovieForm({movie}) {
  let {id}= useParams();
    console.log(id)
    let history = useHistory();

  let updateData = ({name, poster, rating, summary}) => {
    let data = {name, poster, rating, summary}
    fetch('https://6188ad38d0821900178d748d.mockapi.io/movies/'+id,
    {
    method : 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
    })
    .then(data => data.json())
    .then(movies => history.push("/Movies"))
  }
  console.log(movie.name)
  // const [name, setName] = useState(movie.name);
  // const [poster, setPoster] = useState(movie.poster);
  // const [rating, setRating] = useState(movie.rating);
  // const [summary, setSummary] = useState(movie.summary); 
  // let moviesListCopy = moviesLis
  //  let data = { name, poster, rating, summary };
  // setMoviesList(moviesListCopy);
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
  const {handleSubmit, handleChange, handleBlur, values, errors, touched} = useFormik({
    initialValues : {
      name : movie.name,
      poster : movie.poster,
      rating : movie.rating,
      summary : movie.summary
    },
    validationSchema : movieValidationSchema,
    onSubmit : (values) => {
      updateData(values)
    } 
  })
return (
<div>
    <div className="inputCollection">
      <form onSubmit = {handleSubmit}>
      <TextField id = "name"
      name = "name" 
      value={values.name}
      label="name" variant="outlined" onChange={handleChange} onBlur = {handleBlur} 
      error = {errors.name}
      helperText = {errors.name} />
      <TextField 
      id = "poster"
      name = "poster"
      value={values.poster} label="img" variant="outlined" onChange={handleChange} onBlur = {handleBlur} 
      error = {errors.name}
      helperText = {errors.name}/>
      <TextField 
      id = "rating"
      name = "rating"
      value={values.rating} label="rating" variant="outlined" onChange={handleChange} onBlur = {handleBlur} 
      error = {errors.rating}
      helperText = {errors.rating}/>
      <TextField
      id = "summary"
      name = "summary"
      value={values.summary} label="summary" variant="outlined" onChange={handleChange} onBlur = {handleBlur} 
      error = {errors.summary}
      helperText = {errors.summary}/>
      <Button variant="contained" type = "submit" >Done</Button> 
      </form>
</div>
</div>
);
}