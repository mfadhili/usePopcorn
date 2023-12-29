import {useState} from "react";
import {tempWatchedData} from "../data/TempMovieData";
import {WatchedList} from "./WatchedListItem";
import {Summary} from "./Summary";

export function WatchedBox() {
    const [watched, setWatched] = useState(tempWatchedData);
    const [isOpen2, setIsOpen2] = useState(true);

    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen2((open) => !open)}
            >
                {isOpen2 ? "–" : "+"}
            </button>
            {isOpen2 && (
                <>
                    <Summary watched={watched}/>
                    <WatchedList watched={watched}/>
                </>
            )}
        </div>
    );
}

