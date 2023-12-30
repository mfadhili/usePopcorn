import {List, ListBox} from "./ListBox";
import {WatchedBox} from "./WatchedBox";
import {Box} from "./Box";
import {Summary} from "./Summary";
import {WatchedList} from "./WatchedListItem";
import {useState} from "react";
import {tempWatchedData} from "../data/TempMovieData";
import {Box2} from "./Box2";

export function Main({movies}) {
    const [watched, setWatched] = useState(tempWatchedData);

    return (
        <main className="main">
            {/* METHOD 1 OF ELEMENT COMPOSITION*/}
            <Box>
                <List movies={movies}/>
            </Box>
            {/* METHOD 2 OF COMPONENT COMPOSITION*/}
            <Box2 element={
                <>
                    <Summary watched={watched}/>
                    <WatchedList watched={watched}/>
                </>
            }>
            </Box2>
        </main>
    );
}

