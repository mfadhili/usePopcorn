import {Main} from "./components/Main";
import {Logo, Navbar, SearchBar, SearchResults} from "./components/Navbar";
import {useEffect, useState} from "react";
import {tempMovieData} from "./data/TempMovieData";

const KEY = `86ab25f8`


export default function App() {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [loadErr, setLoadErr] = useState("")

    const tempQuery = "rocky"

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



    useEffect(
        function () {
            async function fetchMovies() {
                try {
                    setLoadErr("");
                    // Makes user aware that data is being fetched
                    setIsLoading(true)

                    const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`);
                    const data = await res.json();
                    console.log(data)

                    if (!res.ok) {
                        // err.message
                        throw new Error("Something went wrong with data fetching")
                    }

                    if (data.Response === 'False') {
                        throw new Error("Movie not found")
                    }

                    console.log(data.Search);

                    setMovies(data.Search);
                    setIsLoading(false);
                }
                catch (err) {
                    console.error(err.message);
                    setLoadErr(err.message)
                }
                finally {
                    setIsLoading(false);
                }
            }

            if (query.length < 3) {
                setMovies([])
                setLoadErr("")
                return
            }
            fetchMovies();
        }
   , [query]);




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





