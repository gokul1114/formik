import { useParams } from "react-router";
import { useState,useEffect } from "react";
import "./style.css"



export function MovieDetails() {
  const {id}  = useParams();
  const [movie, setMovie] = useState({})
  useEffect(() => {
    
    fetch('https://6188ad38d0821900178d748d.mockapi.io/movies/'+id)
    .then(data => data.json())
    .then(movies => setMovie(movies))

  }, [])

  return (
    <div>
      <iframe width="1000" height="480" src={movie.trailer} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      <h1>{movie.name}</h1>
      <h2>⭐{movie.rating}</h2>
      <h3>{movie.summary}</h3>
    </div>
  );
}
