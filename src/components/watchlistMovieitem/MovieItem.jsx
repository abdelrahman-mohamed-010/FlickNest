/* eslint-disable react/prop-types */
import DeleteIcon from "@mui/icons-material/Delete";
import "./MovieItem.scss";
import { Link } from "react-router-dom";

function MovieItem({ movie, onDeleteClick }) {
  return (
    <div className="movie-container">
      <Link to={`/movie/${movie.id}`} className="movie-item">
        <img
          className="movie-image"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-details">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-description">{movie.overview}</p>
          <div className="movie-info">
            <span className="info-label">Popularity:</span> {movie.popularity}
          </div>
        </div>
      </Link>
      <DeleteIcon className="delete-icon" onClick={onDeleteClick} />
    </div>
  );
}

export default MovieItem;
