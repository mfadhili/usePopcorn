import {List, ListBox} from "./ListBox";
import {WatchedBox} from "./WatchedBox";
import {Box} from "./Box";
import {Summary} from "./Summary";
import {WatchedList} from "./WatchedListItem";
import {useState} from "react";
import {tempWatchedData} from "../data/TempMovieData";

function LoadingIndicator() {
    return (
        <p className={"loader"}>
            Loading...
        </p>
    );
}

export function Main({movies,isLoading,loadError}) {
    const [watched, setWatched] = useState(tempWatchedData);

    return (
        <main className="main">
            <Box>
                {/*{isLoading ?
                    <LoadingIndicator/>
                    :
                    <List movies={movies}/>
                }*/}
                { isLoading && <LoadingIndicator/> }
                {!isLoading && !loadError && <List movies={movies}/> }
                { loadError && <ErrorMessage message={loadError}/> }
            </Box>
            <Box>
                <>
                    <Summary watched={watched}/>
                    <WatchedList watched={watched}/>
                </>
            </Box>
        </main>
    );
}

// Simple presentational component
function ErrorMessage({message}) {
    return (
        <p className={"error"}>
            <span>Error</span> {message}
        </p>
    );
}