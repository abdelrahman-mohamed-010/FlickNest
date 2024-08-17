/* eslint-disable react/prop-types */
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./movie.scss";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchlist } from "../../redux/watchlistslice";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { useEffect, useState } from "react";

function Movie({ movie }) {
  const dispatch = useDispatch();
  const [watchlistIcon, setWatchlistIcon] = useState("");
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const movies = useSelector((state) => state.watchlist.movies);

  useEffect(() => {
    const isWatchlisted = movies.some((m) => m.id === movie.id);
    if (isWatchlisted) {
      setWatchlistIcon("addedToWatchList");
      console.log("true");
    }
  }, [movies, movie.id]);

  function handleAddToWatchList() {
    dispatch(addToWatchlist(movie));
    setWatchlistIcon("addedToWatchList");
  }

  return (
    <div className="movie">
      <img className="imgMovie" src={imageUrl} alt={movie.title} />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.overview}</p>

        <div className="movie-buttons">
          <Link to={`/movie/${movie.id}`} className="trailer-btn">
            <PlayArrowIcon /> Trailer
          </Link>
          <button
            className="watch-btn"
            onClick={handleAddToWatchList}
            disabled={watchlistIcon ? true : false}
            style={{
              opacity: watchlistIcon ? 0.6 : 1,
              pointerEvents: watchlistIcon ? "none" : "auto",
            }}
          >
            <div className="icon">
              {watchlistIcon ? (
                <PlaylistAddCheckIcon className="added" />
              ) : (
                <AddToPhotosIcon className="add" />
              )}
            </div>
            WatchList
          </button>
        </div>
      </div>
    </div>
  );
}

export default Movie;

