import {List, ListBox} from "./ListBox";
import {WatchedBox} from "./WatchedBox";
import {Box} from "./Box";
import {Summary} from "./Summary";
import {WatchedList} from "./WatchedListItem";
import {useEffect, useState} from "react";
import {tempWatchedData} from "../data/TempMovieData";
import StarRating from "./StarRating";
import {queryByTitle} from "@testing-library/react";

const demoId = 'tt0075148'
const KEY = `86ab25f8`

export function Main({movies,isLoading,loadError}) {
    // const [watched, setWatched] = useState(tempWatchedData);
    const [watched, setWatched] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null );

    function handleSelection(itemId) {
        setSelectedItemId((id) =>
            id === itemId ? null : itemId
        );
    }

    function handleUnSelection() {
        setSelectedItemId(null);
    }

    function handleAddWatched(newMovie) {
        const doesIdExist = watched.some(movie => movie.imdbID === newMovie.imdbID)

        if (!doesIdExist)
        {
            setWatched(watched=>[...watched,newMovie]);
        }
    }

    function handleDeleteWatched(id) {
        setWatched(watched => watched.filter((movie) => movie.imdbID !== id))
    }

    return (
        <main className="main">
            <Box>
                {/*LEFT SIDE*/}
                { isLoading && <LoadingIndicator/> }
                { !isLoading && !loadError && <List movies={movies} handleSelection={handleSelection}/> }
                { loadError && <ErrorMessage message={loadError}/> }
            </Box>
            <Box>
                {/*RIGHT SIDE*/}
                { selectedItemId ?
                    <ItemDetails selectedId={selectedItemId} onUnSelection={handleUnSelection} onAddWatched={handleAddWatched} />
                    :
                    <>
                        <Summary watched={watched}/>
                        <WatchedList watched={watched} onDeleteWatched={handleDeleteWatched}/>
                    </>
                }
            </Box>
        </main>
    );
}

function ItemDetails({selectedId, onUnSelection, onAddWatched, onDeleteWatched}) {
    const [movieItem, setMovieItem] = useState({})
    const [userRating, setUserRating] = useState('')

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre
    } = movieItem

    useEffect(() => {
        async function getItemDetails() {
            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
            const data = await res.json();
            console.log(data);
            setMovieItem(data)
        }
        getItemDetails();
    }, []);

    function handleAdd() {
        const newMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(' ').at(0)),
            userRating,
        };

        onAddWatched(newMovie);
        onUnSelection();
    }

    /* SET TITLE OF WEB PAGE*/
    useEffect(() => {
        if (!title) return;
        document.title = `Movie | ${title}`;

    //     CLEANUP FUNCTION
        return function () {
            document.title = 'usePopcorn';
            console.log(`cleanup effect for movie ${title}`); // closure
        };
    }, [title]);

    return (
        <div className={"details"}>
            <header>
                <button className="btn-back" onClick={onUnSelection}> &larr; </button>
                <img src={poster} alt={`Poster of ${title}`}/>
                <div className="details-overview">
                    <h2>{title}</h2>
                    <p>{released} &bull; {runtime}</p>
                    <p>{genre}</p>
                    <p>{imdbRating} IMDb Rating</p>
                </div>
            </header>
            <section>
                <div className="rating">
                   <StarRating maxRating={10} size={24} onSetRating={setUserRating}/>
                    <button className={"btn-add"} onClick={handleAdd}>+ Add to list</button>
                </div>
                <p><em>{plot}</em></p>
                <p>Starring {actors}</p>
                <p>Directed by {director}</p>
            </section>
        </div>
    );
}

function LoadingIndicator() {
    return (
        <p className={"loader"}>
            Loading...
        </p>
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