import {List, ListBox} from "./ListBox";
import {WatchedBox} from "./WatchedBox";
import {Box} from "./Box";
import {Summary} from "./Summary";
import {WatchedList} from "./WatchedListItem";
import {useState} from "react";
import {tempWatchedData} from "../data/TempMovieData";

export function Main({movies}) {
    const [watched, setWatched] = useState(tempWatchedData);

    return (
        <main className="main">
            <Box>
                <List movies={movies}/>
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

