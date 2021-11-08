import "./App.css";
import "./style.css"
import { MovieList, AddMovie } from "./MovieList";
import { Link, Route, Switch as Sw } from "react-router-dom";
import { Color } from "./Color";
import EditMovies from "./EditMovies";
import { useState,useEffect } from "react";
import { MovieDetails } from "./MovieDetails";
import { ThemeProvider, useTheme, createTheme } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

import Paper from "@mui/material/Paper";
import { Hidden } from "@mui/material";
import { Formik, useFormik } from "formik";




import * as yup from "yup"

import { TicTacToe } from "./TicTacToe";

export default function App() {
  // const [color, setColor] = useState("orange");
  // let styles = {backgroundColor : color};

  // return <input value = {color} style = {styles} onChange = {(event)=> setColor(event.target.value) } />

  const movies = [
    {
      name: "Interstellar",
      poster: "https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
      rating: 8.6,
      summary: ` When Earth becomes uninhabitable in the future, a farmer and ex-NASA
pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team
of researchers, to find a new planet for humans.`,
      trailer: `https://www.youtube.com/embed/zSWdZVtXT7E`,
    },
    {
      name: "Baahubali",
      poster: "https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
      rating: 8,
      summary: `In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.`,
      trailer: `https://www.youtube.com/watch?v=zSWdZVtXT7E`,
    },
    {
      name: "Ratatouille",
      poster:
        "https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
      rating: 8,
      summary: `Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.`,
      trailer: `https://www.youtube.com/watch?v=zSWdZVtXT7E`,
    },

    {
      name: "96",
      poster:
        "https://a10.gaanacdn.com/gn_img/albums/9En3peWXDV/En3pYMLPWX/size_xxl_1535086576.webp",
      rating: 8.6,
      summary: `K Ramachandran, a photographer, gets nostalgic after he visits his school in his hometown. During a reunion with his classmates, he meets Janaki, his childhood sweetheart.`,
      trailer: `https://www.youtube.com/watch?v=zSWdZVtXT7E`,
    },

    {
      name: "M.S. Dhoni: The Untold Story",
      poster: "https://m.media-amazon.com/images/I/71miTEyKvYL._SL1112_.jpg",
      rating: 7.9,
      summary: `M S Dhoni, a boy from Ranchi, aspires to play cricket for India. Though he initially tries to please his father by working for the Indian Railways, he ultimately decides to chase his dreams.`,
      trailer: `https://www.youtube.com/watch?v=zSWdZVtXT7E`,
    },
  ];
  const [moviesList, setMoviesList] = useState([]);
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
 
  useEffect(()=>{
    fetch('https://6188ad38d0821900178d748d.mockapi.io/movies')
    .then(data => data.json())
    .then(movies => setMoviesList(movies))
  }, [])
  let toggle = () => {
    setMode(mode == "dark" ? "light" : "dark");
  };


  return (
    <ThemeProvider theme={darkTheme}>
      <Paper elevation={0}>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Movies">Moives</Link>
            </li>
            <li>
              <Link to="/ColorGame">Color Game</Link>
            </li>
            <li>
              <Link to="/ticTacToe">TicTacToe Game</Link>
            </li>
            <li>
              <Link to="/form">Validation</Link>
            </li>
            <li>
              <Switch
                onClick={() => setMode(mode == "dark" ? "light" : "light")}
              ></Switch>
              {mode == "dark" ? "Switch to light" : "Switch to dark"}
            </li>
          </ul>

          <Sw>
            <Route exact path="/">
              <Welcome />
            </Route>
            <Route path="/Movies">
              <MovieList />
            </Route>
            <Route path="/AddMovie">
              <AddMovie  />
            </Route>
            <Route path="/MovieDetails/:id">
              <MovieDetails />
            </Route>
            <Route path="/ColorGame">
              <Color />
            </Route>
            <Route path="/editMovie/:id">
              <EditMovies />
            </Route>
            <Route path="/ticTacToe">
              <TicTacToe />
            </Route>
            <Route path="/form">
              <BasicForm />
            </Route>
          </Sw>
        </div>
      </Paper>
    </ThemeProvider>
  );
}

function Welcome() {
  return (
    <div>
      <h1> Welcome All</h1>
    </div>
  );
}

// function BasicForm() {
//   let validateForm = (values) => {
//   let errors = {}
//   console.log("validate" + values);
//   if(values.email.length < 5) {
//     errors.email = "Enter valid email"
//   }
//   else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)){
//     errors.email = "Enter valid email"
//   }
//   if(values.password.length < 8) {
//     errors.password = "Enter longer password"
//   }
//   else if(values.password.length > 12){
//     errors.password = "Enter smaller password"
//   }

//   return errors
//   }

//   return(
//     <div>
//     <Formik initialValues = {{email:'abc@gmail.com', password:''}} 
//      validate ={validateForm}
//      onSubmit = {(values) => 
//     {
//       console.log("values" + values);
//     }}>
//       {(formik) => (
//         <form onSubmit = {formik.handleSubmit}>
//         <input
//         id = "email"
//         name = "email"
//          type = "email"
//          value = {formik.values.email}
//          onChange= {formik.handleChange}
//          onBlur = {formik.handleBlur}
//          />
//          {formik.errors.email && formik.touched.email && formik.errors.email}
//         <input 
//         id = "password"
//         name = "password"
//         type = "password"
//         value = {formik.values.password}
//         onChange= {formik.handleChange}
//         onBlur = {formik.handleBlur}/>
//         {formik.errors.password && formik.touched.password && formik.errors.password}
//         <button>Submit</button>
//       </form>
//       )}
      

//     </Formik>
//     </div>
//   )
// }
 

function BasicForm() {
  
  const formValidationSchema = yup.object({
    email : yup
    .string()
    .min(5, "Need a biger email")
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Enter a valid email"),
    password : yup
    .string()
    .min(8)
    .max(12)
  })

  const {handleSubmit, handleChange, handleBlur, values, errors, touched  } = useFormik({
    initialValues : {email:'abc@gmail.com', password:''},
    validationSchema : formValidationSchema,
    onSubmit :  (values) => 
      {
        console.log("values" + values);
      } 

    })
    return(
    <div>
        <form onSubmit = {handleSubmit}>
        <input
        id = "email"
        name = "email"
         type = "email"
         value = {values.email}
         onChange= {handleChange}
         onBlur = {handleBlur}
         />
         {errors.email && touched.email && errors.email}
        <input 
        id = "password"
        name = "password"
        type = "password"
        value = {values.password}
        onChange= {handleChange}
        onBlur = {handleBlur}/>
        {errors.password && touched.password && errors.password}
        <button>Submit</button>
      </form>
      </div>
    )
}

