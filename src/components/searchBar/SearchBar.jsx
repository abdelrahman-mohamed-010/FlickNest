import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.scss";

function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const apiKey = import.meta.env.VITE_KEY;
  const navigate = useNavigate();

  const handleSearch = async (value) => {
    if (selectedMovie && selectedMovie.title === value) {
      return;
    }

    setSearchValue(value);

    if (value === "") {
      setMovies([]);
    } else {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${value}&api_key=${apiKey}`
        );
        if (response.ok) {
          const data = await response.json();
          setMovies(data.results);
        } else {
          console.error("Failed to fetch movies");
        }
      } catch (error) {
        console.error("Error fetching movies", error);
      }
    }
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setSearchValue(movie.title);
    setMovies([]);
    navigate(`/movie/${movie.id}`);
  };

  useEffect(() => {
    if (selectedMovie && selectedMovie.title !== searchValue) {
      setSelectedMovie(null);
    }
  }, [searchValue, selectedMovie]);

  return (
    <div className="navbar-actions">
      <input
        type="text"
        className="navbar-search"
        onChange={(e) => handleSearch(e.target.value)}
        value={searchValue}
        placeholder="Search..."
      />

      {movies.length > 0 && !selectedMovie && searchValue !== "" && (
        <div className="list">
          {movies.map((movie) => (
            <div
              className="movie"
              key={movie.id}
              onClick={() => handleMovieSelect(movie)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt=""
              />
              <div className="txt">
                <div className="title">{movie.title}</div>
                <div className="scnd">
                  <div className="date">
                    Release date: {movie.release_date.slice(0, 4)}
                  </div>
                  <div className="pop">Popularity: {movie.popularity}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
