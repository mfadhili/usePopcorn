import {useEffect, useRef, useState} from "react";

export function Navbar({children}) {

    return (
        <nav className="nav-bar">
            {children}
        </nav>
    );


}

export function Logo() {
    return (
        <div className="logo">
            <span role="img">🍿</span>
            <h1>usePopcorn</h1>
        </div>
    );
}

export function SearchBar({query, setQuery}) {

    // useEffect(() => {
    //     const el = document.querySelector(".search");
    //     console.log(el);
    //     el.focus(); // focuses element on loading -
    // }, []);

    const inputEL = useRef(null);

    useEffect(() => {
        function callback(e) {
            if (document.activeElement === inputEL.current){
                // WHEN THE INPUT IS ALREADY SELECTED, IT PERSISTS
                return;
            }
            if (e.code === "Enter"){
                // TO ADD DOM TO REF ONCE LOADING PAGE COMPLETE
                console.log(inputEL.current);
                inputEL.current.focus();
                setQuery("")
            }
        }

        document.addEventListener('keydown', callback);
        return () => document.addEventListener('keydown',callback);
    }, [setQuery]);

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputEL}
        />
    );
}

export function SearchResults({movies}) {
    return (
        <p className="num-results">
            {/*Found <strong>{movies.length}</strong> results*/}
        </p>
    );
}