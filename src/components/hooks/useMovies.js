import {useEffect, useState} from "react";

export function useMovies(query,KEY) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadErr, setLoadErr] = useState("")

    useEffect(
        function () {
            //  USE ABORT CONTROLLER TO AVOID RACE CONDITIONS ON THE DATA FETCHING
            const controller = new AbortController();

            async function fetchMovies() {
                try {
                    setLoadErr("");
                    // Makes user aware that data is being fetched
                    setIsLoading(true);

                    const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`, {signal: controller.signal});
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
                    setLoadErr("");
                }
                catch (err) {
                    console.error(err.message);
                    if (err.name !== "AbortError"){
                        setLoadErr(err.message) // ALLOWS IGNORING OF ABORT RACE CONDITIONS BEING CAPTURED AS AN ERROR
                    }
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

            //     CLEAN UP FUNCTION
            return function () {
                controller.abort();
            };
        }
        , [query,KEY]);

    return {movies,isLoading,loadErr};
}