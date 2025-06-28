import { useState, useEffect } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import "./movie.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useWatchlist } from "../../hooks/useWatchlist";

function Movie({ movie }) {
  const { user } = useAuth();
  const { addToWatchlist, removeFromWatchlist, checkIsInWatchlist } = useWatchlist();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [loading, setLoading] = useState(false);

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  useEffect(() => {
    const checkWatchlistStatus = async () => {
      if (user && movie.id) {
        const inWatchlist = await checkIsInWatchlist(movie.id);
        setIsInWatchlist(inWatchlist);
      }
    };
    checkWatchlistStatus();
  }, [user, movie.id, checkIsInWatchlist]);

  const handleWatchlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) return;
    
    setLoading(true);
    
    try {
      if (isInWatchlist) {
        await removeFromWatchlist(movie.id);
        setIsInWatchlist(false);
      } else {
        await addToWatchlist(movie);
        setIsInWatchlist(true);
      }
    } catch (error) {
      console.error('Error updating watchlist:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="movie-card">
      <div className="movie-image-container">
        <img
          className="movie-image"
          src={imageUrl}
          alt={movie.title}
          loading="lazy"
        />
        <div className="movie-overlay">
          <div className="movie-info">
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-overview">{movie.overview}</p>
            <div className="movie-actions">
              <Link to={`/movie/${movie.id}`} className="play-button">
                <PlayArrowIcon />
              </Link>
              {user && (
                <button
                  className={`watchlist-button ${isInWatchlist ? 'in-watchlist' : ''}`}
                  onClick={handleWatchlistToggle}
                  disabled={loading}
                >
                  {isInWatchlist ? <CheckIcon /> : <AddIcon />}
                </button>
              )}
              <Link to={`/movie/${movie.id}`} className="info-button">
                <InfoOutlinedIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;