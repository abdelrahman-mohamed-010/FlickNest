import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MoviePage.scss";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Movie from "../../components/movie/Movie";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchlist } from "../../redux/watchlistslice";

function MoviePage() {
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [actors, setActors] = useState([]);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const dispatch = useDispatch();
  const movies = useSelector((state) => state.watchlist.movies);
  const { id } = useParams();
  const apiKey = import.meta.env.VITE_KEY;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const fetchMovie = async () => {
      try {
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
        );
        if (!movieResponse.ok) throw new Error("Network response was not ok");
        const movieData = await movieResponse.json();
        setMovie(movieData);

        const videoResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`
        );
        if (!videoResponse.ok) throw new Error("Network response was not ok");
        const videoData = await videoResponse.json();
        const trailer = videoData.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailer(trailer ? trailer.key : null);

        const actorsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
        );
        if (!actorsResponse.ok) throw new Error("Network response was not ok");
        const actorsData = await actorsResponse.json();
        setActors(actorsData.cast);

        const relatedMoviesResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=en-US`
        );
        if (!relatedMoviesResponse.ok)
          throw new Error("Network response was not ok");
        const relatedMoviesData = await relatedMoviesResponse.json();
        setRelatedMovies(relatedMoviesData.results);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
      setTimeout(() => {
        setShowContent(true);
      }, 100);
    };

    fetchMovie();
  }, [id, apiKey]);

  useEffect(() => {
    if (movie) {
      const isWatchlisted = movies.some((m) => m.id === movie.id);
      setIsWatchlisted(isWatchlisted);
    }
  }, [movies, movie]);

  const handleAddToWatchlist = () => {
    if (!isWatchlisted) {
      dispatch(addToWatchlist(movie));
      setIsWatchlisted(true);
    }
  };

  const actorSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: actors.length > 6 ? 6 : actors.length,
    slidesToScroll: 2,
    arrows: actors.length > 6,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
        },
      },
    ],
  };

  const relatedMoviesSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: relatedMovies.length > 6 ? 6 : relatedMovies.length,
    slidesToScroll: 4,
    arrows: relatedMovies.length > 6,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className={`movie-page ${showContent ? "fade-in" : ""}`}>
      {movie && (
        <div className="movie-details">
          <div className="movie-info">
            <div className="text-content">
              <h1 className="movie-title">{movie.title}</h1>
              <p className="movie-description">{movie.overview}</p>
              <div className="date">Release date: {movie.release_date}</div>
              <div className="pop">Popularity: {movie.popularity}</div>
            </div>
            <div className="movie-trailer">
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${trailer}`}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <button
            className={`watchlist-btn ${isWatchlisted ? "added" : ""}`}
            onClick={handleAddToWatchlist}
            disabled={isWatchlisted}
          >
            {isWatchlisted ? "Added to Watchlist" : "Add to Watchlist"}
          </button>
          {actors.length > 0 && (
            <>
              <div className="movie-actors">
                <h2>Actors</h2>
                <Slider {...actorSettings}>
                  {actors.map((actor) => (
                    <div key={actor.id} className="actor">
                      <div className="image">
                        <img
                          src={
                            actor.profile_path
                              ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                              : "https://via.placeholder.com/140"
                          }
                          alt={actor.name}
                        />
                      </div>
                      <div className="actor-name">{actor.name}</div>
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="movie-list-phone">
                <h2>Actors</h2>
                <div className="actors-phone">
                  {actors.map((actor) => (
                    <div key={actor.id} className="actor">
                      <div className="image">
                        <img
                          src={
                            actor.profile_path
                              ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                              : "https://via.placeholder.com/140"
                          }
                          alt={actor.name}
                        />
                      </div>
                      <div className="actor-name">{actor.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          {relatedMovies.length > 0 && (
            <>
              <div className="related-movies">
                <h2>Related Movies</h2>
                <Slider {...relatedMoviesSettings}>
                  {relatedMovies.map((movie) => (
                    <Movie key={movie.id} movie={movie} />
                  ))}
                </Slider>
              </div>
              <div className="movie-list-phone related">
                <h2>Related movies</h2>
                <div className="movies-phone">
                  {relatedMovies.map((movie) =>
                    movie.poster_path ? (
                      <Link key={movie.id} to={`/movie/${movie.id}`}>
                        <img
                          className="phoneMovieImg"
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          loading="lazy"
                        />
                      </Link>
                    ) : null
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default MoviePage;
