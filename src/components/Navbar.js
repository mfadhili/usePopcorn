import {useState} from "react";

export function Navbar() {

    return (
        <nav className="nav-bar">
            <Logo/>
            <SearchBar/>
            <SearchResults/>
        </nav>
    );


}

function Logo() {
    return (
        <div className="logo">
            <span role="img">🍿</span>
            <h1>usePopcorn</h1>
        </div>
    );
}

function SearchBar() {
    const [query, setQuery] = useState("");

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    );
}

function SearchResults() {
    return (
        <p className="num-results">
            Found <strong>movies.length</strong> results
        </p>
    );
}