import {Main} from "./components/Main";
import {Navbar} from "./components/Navbar";
import {useState} from "react";
import {tempMovieData} from "./data/TempMovieData";

export default function App() {
    const [movies, setMovies] = useState(tempMovieData);
  return (
      <>
        <Navbar movies={movies}/>
        <Main movies={movies}/>
      </>
  );
}

