import { useState, useEffect, useCallback } from "react";
import "./categories.scss";
import ReactPaginate from "react-paginate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchGenres, fetchMovies } from "../../util/http";

function Categories() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const apiKey = import.meta.env.VITE_KEY;
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page")) || 1;
  const categ = queryParams.get("categ") || "";

  const { data: genres } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    onSuccess: () => {
      console.log("Genres refetched");
    },
  });

  const { data: moviesData, isLoading } = useQuery({
    queryKey: ["movies", selectedGenres, currentPage],
    queryFn: () => fetchMovies(apiKey, selectedGenres, currentPage),
  });

  // Update URL with new page and genre selections
  const updateUrl = useCallback(
    (page, genres) => {
      // Use setTimeout to defer URL updates and avoid performing during render phase
      setTimeout(() => {
        const url = new URLSearchParams();
        if (page) url.set("page", page);
        if (genres.length > 0) url.set("categ", genres.join(","));
        else url.delete("categ"); // Remove categ if no genres selected
        navigate(`?${url.toString()}`);
      }, 0);
    },
    [navigate]
  );

  // Update selected genres when URL category param changes
  useEffect(() => {
    if (categ) {
      const genreArray = categ.split(",").map(Number).filter(Boolean);
      setSelectedGenres(genreArray);
    } else {
      setSelectedGenres([]);
    }
  }, [categ]);

  const handleGenreClick = (genreId) => {
    setSelectedGenres((prevSelected) => {
      const updatedGenres = prevSelected.includes(genreId)
        ? prevSelected.filter((id) => id !== genreId)
        : [...prevSelected, genreId];

      // Reset page number to 1 when filters change
      updateUrl(1, updatedGenres);
      return updatedGenres;
    });
  };

  const handlePageChange = ({ selected }) => {
    const newPage = selected + 1;
    updateUrl(newPage, selectedGenres);
    window.scrollTo(0, 0); // Scroll to top on page change
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
        {genres &&
          genres.map((genre) => (
            <button
              key={genre.id}
              className={`category-btn ${isSelected(genre.id) ? "active" : ""}`}
              onClick={() => handleGenreClick(genre.id)}
            >
              {genre.name}
            </button>
          ))}
      </div>

      {isLoading ? (
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
            {moviesData &&
              moviesData.results &&
              moviesData.results.map((movie) => (
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

          {moviesData &&
            moviesData.total_pages &&
            moviesData.total_pages > 1 && (
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={moviesData.total_pages}
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
