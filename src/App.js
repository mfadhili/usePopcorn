import {Main} from "./components/Main";
import {Logo, Navbar, SearchBar, SearchResults} from "./components/Navbar";
import {useState} from "react";
import {tempMovieData} from "./data/TempMovieData";

export default function App() {
    const [movies, setMovies] = useState(tempMovieData);
  return (
      <>
        <Navbar>
            <Logo/>
            <SearchBar />
            <SearchResults movies={movies}/>
        </Navbar>
        <Main movies={movies}>
        </Main>
      </>
  );
}

