import {useState} from "react";
import {tempMovieData} from "../data/TempMovieData";

export function ListBox({children}) {

    const [isOpen1, setIsOpen1] = useState(true);

    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen1((open) => !open)}
            >
                {isOpen1 ? "–" : "+"}
            </button>
            {isOpen1 && children}
        </div>
    );
}

export function List({movies}) {
    return (
        <ul className="list">
            {movies?.map((movie) => (
                <ListItem movie={movie} key={movie.imdbID}/>
            ))}
        </ul>
    );
}

function ListItem({movie}) {
    return (
        <li>
            <img src={movie.Poster} alt={`${movie.Title} poster`}/>
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    );
}