import { useState, useEffect, useCallback } from "react";
import "./categories.scss";
import ReactPaginate from "react-paginate";
import { useNavigate, useLocation, Link } from "react-router-dom";

function Categories() {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const apiKey = import.meta.env.VITE_KEY;
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page")) || 1;
  const categ = queryParams.get("categ") || "";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
        );
        const data = await response.json();
        if (data.genres) {
          setGenres(data.genres);
        }
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, [apiKey]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const genreQuery = selectedGenres.join(",");
        const url = genreQuery
          ? `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=${genreQuery}&page=${currentPage}`
          : `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=${currentPage}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch movies.");
        }

        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [apiKey, currentPage, selectedGenres]);

  useEffect(() => {
    const genreArray = categ.split(",").map(Number).filter(Boolean);
    setSelectedGenres(genreArray);
  }, [categ]);

  const updateUrl = useCallback(
    (page, genres) => {
      const url = new URLSearchParams();
      if (page) url.set("page", page);
      if (genres.length > 0) url.set("categ", genres.join(","));
      navigate(`?${url.toString()}`);
    },
    [navigate]
  );

  const handleGenreClick = (genreId) => {
    setSelectedGenres((prevSelected) => {
      const updatedGenres = prevSelected.includes(genreId)
        ? prevSelected.filter((id) => id !== genreId)
        : [...prevSelected, genreId];

      updateUrl(1, updatedGenres);
      return updatedGenres;
    });
  };

  const handlePageChange = ({ selected }) => {
    const newPage = selected + 1;
    updateUrl(newPage, selectedGenres);
  };

  const isSelected = (genreId) => selectedGenres.includes(genreId);

  return (
    <div className="categories">
      <div className="btn-holder">
        <button
          className={`category-btn ${
            selectedGenres.length === 0 && !categ ? "active" : ""
          }`}
          onClick={() => {
            setSelectedGenres([]);
            updateUrl(1, []);
          }}
        >
          All
        </button>
        {genres.map((genre) => (
          <button
            key={genre.id}
            className={`category-btn ${isSelected(genre.id) ? "active" : ""}`}
            onClick={() => handleGenreClick(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="skeleton-loader">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="skeleton-item">
                <div className="skeleton-poster"></div>
                <div className="skeleton-details">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-overview"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <ul>
            {movies.map((movie) => (
              <Link
                to={`/movie/${movie.id}`}
                key={movie.id}
                className="movie-item"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
                <div className="movie-details">
                  <h2>{movie.title}</h2>
                  <p>{movie.overview}</p>
                  <p>
                    <strong>Popularity:</strong> {movie.popularity}
                  </p>
                </div>
              </Link>
            ))}
          </ul>

          {totalPages > 1 && (
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
              forcePage={currentPage - 1}
              pageClassName={"page-item"}
              previousClassName={"prev-item"}
              nextClassName={"next-item"}
              breakClassName={"break-item"}
              disabledClassName={"disabled-item"}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Categories;
