import React, {useState} from "react";
import "./App.css";

interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    runtime?: number;
    imdbRating?: number;
    userRating?: number;
}

const tempMovieData: Movie[] = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    },
    {
        imdbID: "tt0133093",
        Title: "The Matrix",
        Year: "1999",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    },
    {
        imdbID: "tt6751668",
        Title: "Parasite",
        Year: "2019",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    },
];

const tempWatchedData: Movie[] = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        runtime: 148,
        imdbRating: 8.8,
        userRating: 10,
    },
    {
        imdbID: "tt0088763",
        Title: "Back to the Future",
        Year: "1985",
        Poster:
            "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        runtime: 116,
        imdbRating: 8.5,
        userRating: 9,
    },
];

const average = (arr: number[]) =>
    arr.reduce((acc, cur) => acc + cur, 0) / arr.length;

export default function App() {

    const [movies, setMovies] = useState<Movie[]>(tempMovieData);
    const [watched, setWatched] = useState<Movie[]>(tempWatchedData);

    return (
        <>

            <NavBar>
                <Search/>
                <NumResults movies={movies}/>
            </NavBar>
            <Main>
                <Box>
                    <MovieList movies={movies}/>
                </Box>
                <Box>

                    <WatchedSummary watched={watched}/>
                    <WatchedMoviesList watched={watched}/>

                </Box>
            </Main>
        </>
    );
}

function NavBar({children}: { children: React.ReactNode }) {

    return <nav className="nav-bar">
        <Logo/>
        {children}
    </nav>
}

function Logo() {
    return <div className="logo">
          <span role="img" aria-label="popcorn">
            🍿
          </span>
        <h1>usePopcorn</h1>
    </div>
}

function NumResults({movies}: { movies: Movie[] }) {
    return <p className="num-results">
        Found <strong>{movies.length}</strong> results
    </p>
}

function Search() {
    const [query, setQuery] = useState<string>("");

    return <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
    />
}

function Main({children}: { children: React.ReactNode }) {


    return <main className="main">
        {children}
    </main>
}

function Box({children}: { children: React.ReactNode }) {

    const [isOpen, setIsOpen] = useState(true);


    return <div className="box">
        <button
            className="btn-toggle"
            onClick={() => setIsOpen((open) => !open)}
        >
            {isOpen ? "–" : "+"}
        </button>
        {isOpen && children}
    </div>

}


function MovieList({movies}: { movies: Movie[] }) {


    return <ul className="list">
        {movies?.map((movie) => (
            <Movie movie={movie} key={movie.imdbID}/>
        ))}
    </ul>
}

function Movie({movie}: { movie: Movie }) {
    return <li>
        <img
            src={movie.Poster}
            alt={`${movie.Title} poster`}
        />
        <h3>{movie.Title}</h3>
        <div>
            <p>
                <span>🗓</span>
                <span>{movie.Year}</span>
            </p>
        </div>
    </li>
}


function WatchedSummary({watched}: { watched: Movie[] }) {

    const avgImdbRating = average(watched.map((movie) => movie.imdbRating || 0));
    const avgUserRating = average(watched.map((movie) => movie.userRating || 0));
    const avgRuntime = average(watched.map((movie) => movie.runtime || 0));

    return <div className="summary">
        <h2>Movies you watched</h2>
        <div>
            <p>
                <span>#️⃣</span>
                <span>{watched.length} movies</span>
            </p>
            <p>
                <span>⭐️</span>
                <span>{avgImdbRating}</span>
            </p>
            <p>
                <span>🌟</span>
                <span>{avgUserRating}</span>
            </p>
            <p>
                <span>⏳</span>
                <span>{avgRuntime} min</span>
            </p>
        </div>
    </div>

}


function WatchedMoviesList({watched}: { watched: Movie[] }) {
    return <ul className="list">
        {watched.map((movie) => (
            <WatchedMovie movie={movie}/>
        ))}
    </ul>
}


function WatchedMovie({movie}: { movie: Movie }) {
    return <li key={movie.imdbID}>
        <img
            src={movie.Poster}
            alt={`${movie.Title} poster`}
        />
        <h3>{movie.Title}</h3>
        <div>
            <p>
                <span>⭐️</span>
                <span>{movie.imdbRating}</span>
            </p>
            <p>
                <span>🌟</span>
                <span>{movie.userRating}</span>
            </p>
            <p>
                <span>⏳</span>
                <span>{movie.runtime} min</span>
            </p>
        </div>
    </li>
}

