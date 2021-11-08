import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Counter from "./Counter";
import { useHistory } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import "./style.css"


export function DisplayMovie({ name, img, rating, summary, id }) {
  const [styleForSummary, setStyleForSummary] = useState("block");
  const [displayMovie, setDisplayMovie] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const history = useHistory();
  const deleteMovie = (id) => {
    setIsDeleted(false)
    fetch('https://6188ad38d0821900178d748d.mockapi.io/movies/'+id, {
      method: 'DELETE',
      headers: {
          'Content-type': 'application/json'
      }
  }).then(data => data.json())
  .then(dataJson => {
    console.log(dataJson)
    setIsDeleted(true)
    
  })
  }
useEffect(() => {
  console.log("inside useEffect")
}, [isDeleted])



  let styleToDelete = { display: displayMovie };
  let styles = { display: styleForSummary };
  return (
    <div style={styleToDelete} className="movie-container">
      <img className="movie-poster" src={img} alt={name} />
      <div className="movie-specs">
        <h3 className="movie-name">{name}
          <InfoIcon onClick={() => history.push("/MovieDetails/" + id)}></InfoIcon>
        </h3>
        <p className="movie-rating">
          <span aria-label="" role="img">
            ⭐
          </span>
          {rating}
        </p>
      </div>
      <Button variant="contained" onClick={() => setStyleForSummary(styleForSummary == "none" ? "block" : "none")}>{styleForSummary == "none" ? "show descriptoin" : "hide description"}</Button>
      <p style={styles}>{summary}</p>
      <Button variant="contained" onClick={() => {deleteMovie(id)}}>Delete</Button>
      <Button variant="outlined" onClick={() => history.push("/editMovie/" + id)}>Edit</Button>
      <Counter />
    </div>
  );
}
