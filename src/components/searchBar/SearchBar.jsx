import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import "./SearchBar.scss";

function SearchBar({ handleLinkClick }) {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const apiKey = import.meta.env.VITE_KEY;
  const navigate = useNavigate();
  const location = useLocation();

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
    handleLinkClick();
    navigate(`/movie/${movie.id}`);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setMovies([]);
  };

  useEffect(() => {
    if (selectedMovie && selectedMovie.title !== searchValue) {
      setSelectedMovie(null);
    }
  }, [searchValue, selectedMovie]);

  useEffect(() => {
    const movieUrlPattern = /^\/movie\/\d+$/;
    if (!movieUrlPattern.test(location.pathname)) {
      setSearchValue("");
      setMovies([]);
      setSelectedMovie(null);
    }
  }, [location]);

  return (
    <div className="navbar-actions">
      <div className="search-container">
        <input
          type="text"
          className="navbar-search"
          onChange={(e) => handleSearch(e.target.value)}
          value={searchValue}
          placeholder="Search..."
        />
        {searchValue && (
          <CloseIcon className="close-icon" onClick={handleClearSearch} />
        )}
      </div>
      {movies.length > 0 && !selectedMovie && searchValue !== "" && (
        <div className="list">
          {movies
            .filter((movie) => movie.poster_path)
            .map((movie) => (
              <div
                className="movie"
                key={movie.id}
                onClick={() => handleMovieSelect(movie)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || "Movie Poster"}
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
