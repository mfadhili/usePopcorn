import {Main} from "./components/Main";
import {Logo, Navbar, SearchBar, SearchResults} from "./components/Navbar";
import {useEffect, useState} from "react";
import {tempMovieData} from "./data/TempMovieData";
import {useMovies} from "./components/hooks/useMovies";

const KEY = `86ab25f8`


export default function App() {
    const [query, setQuery] = useState("");
    const tempQuery = "rocky"

    const {movies,isLoading, loadErr} = useMovies(query,KEY);

    /*
    useEffect(() => {
        console.log("NOT SYNC WITH ANY VARIABLE RUN ON MOUNT, AFTER INITIAL RENDER")
    }, []);

    useEffect(() => {
        console.log("SENSITIVE TO COMPONENT CHANGES, SYNC WITH/ AFTER EVERY RENDER") //
    });

    console.log("RENDER LOGIC RUN, DURING RENDER") // RENDER LOGIC RUN FASER

    useEffect(() => {
        console.log("SYNC WITH CHANGES IN QUERY STATE")
    }, [query]);
    */

    return (
      <>
        <Navbar>
            <Logo/>
            <SearchBar query={query} setQuery={setQuery}/>
            <SearchResults movies={movies}/>
        </Navbar>
        <Main movies={movies} isLoading={isLoading} loadError={loadErr}  />
      </>
  );
}





