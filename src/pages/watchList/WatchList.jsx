import React from 'react';
import { useWatchlist } from '../../hooks/useWatchlist';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import './watchList.scss';

function WatchList() {
  const { watchlist, loading, removeFromWatchlist } = useWatchlist();

  const handleRemove = async (movieId) => {
    if (window.confirm('Remove this movie from your watchlist?')) {
      await removeFromWatchlist(movieId);
    }
  };

  if (loading) {
    return (
      <div className="watchlist-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your watchlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="watchlist-page">
      <div className="watchlist-header">
        <h1>My List</h1>
        <p>{watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'}</p>
      </div>

      {watchlist.length === 0 ? (
        <div className="empty-watchlist">
          <h2>Your list is empty</h2>
          <p>Movies you add to your list will appear here.</p>
          <Link to="/categories" className="netflix-button">
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="watchlist-grid">
          {watchlist.map((item) => (
            <div key={item.id} className="watchlist-item">
              <Link to={`/movie/${item.movie_id}`} className="movie-link">
                <div className="movie-poster">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.movie_poster_path}`}
                    alt={item.movie_title}
                    loading="lazy"
                  />
                </div>
                <div className="movie-info">
                  <h3>{item.movie_title}</h3>
                  <p className="movie-overview">{item.movie_overview}</p>
                  <div className="movie-meta">
                    <span className="release-date">
                      {item.movie_release_date ? new Date(item.movie_release_date).getFullYear() : 'N/A'}
                    </span>
                    <span className="popularity">
                      ★ {item.movie_popularity ? Math.round(item.movie_popularity) : 'N/A'}
                    </span>
                  </div>
                </div>
              </Link>
              <button
                className="remove-button"
                onClick={() => handleRemove(item.movie_id)}
                title="Remove from watchlist"
              >
                <DeleteIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchList;