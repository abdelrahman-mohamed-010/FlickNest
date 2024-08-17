import { useDispatch, useSelector } from "react-redux";
import "./watchList.scss";
import Modal from "../../components/modal/Modal";
import { useState, useMemo } from "react";
import { removeFromWatchlist } from "../../redux/watchlistslice";
import MovieItem from "../../components/watchlistMovieitem/MovieItem";

function WatchList() {
  const movies = useSelector((state) => state.watchlist.movies);
  const [showModal, setShowModal] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (movieToDelete) {
      dispatch(removeFromWatchlist(movieToDelete.id));
      setShowModal(false);
    }
  };

  const renderedMovies = useMemo(() => {
    return movies.map((movie) => (
      <MovieItem
        key={movie.id}
        movie={movie}
        onDeleteClick={() => {
          setMovieToDelete(movie);
          setShowModal(true);
        }}
      />
    ));
  }, [movies]);

  return (
    <div className="watchlist-container">
      <h2 className="watchlist-title">My Watchlist</h2>
      {movies.length === 0 ? (
        <p className="no-movies">No movies in the list</p>
      ) : (
        <div className="movie-list">{renderedMovies}</div>
      )}
      {showModal && movieToDelete && (
        <Modal open={showModal} className="deleteModal">
          <h2>Are you sure you want to delete {movieToDelete.title}?</h2>
          <div className="btns">
            <div className="delete" onClick={handleDelete}>
              Delete
            </div>
            <div className="close" onClick={() => setShowModal(false)}>
              Close
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default WatchList;
