import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.scss";
import MovieList from "../../components/movieList/MovieList";
import { PlayArrow } from "@mui/icons-material";

function Home() {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const apiKey = import.meta.env.VITE_KEY;
  const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=5`;
  const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=8`;
  const upcomingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=3`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [topRatedResponse, popularResponse, upcomingResponse] =
          await Promise.all([
            fetch(topRatedUrl).then((response) => response.json()),
            fetch(popularUrl).then((response) => response.json()),
            fetch(upcomingUrl).then((response) => response.json()),
          ]);

        setTopRatedMovies(topRatedResponse.results);
        setPopularMovies(popularResponse.results);
        setUpcomingMovies(upcomingResponse.results);

        if (popularResponse.results.length > 0) {
          const randomMovie =
            popularResponse.results[
              Math.floor(Math.random() * popularResponse.results.length)
            ];
          setFeaturedMovie(randomMovie);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="home">
      <div className="featured">
        <div className="featured-image-container">
          {!imageLoaded && <div className="skeleton-loader"></div>}
          {featuredMovie && (
            <img
              src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
              alt={featuredMovie.title}
              className={`featured-image ${imageLoaded ? "loaded" : ""}`}
              onLoad={handleImageLoad}
            />
          )}
        </div>
        <div className="overlay"></div>
        <div className="info">
          <h1 className="title">{featuredMovie?.title}</h1>
          <p className="desc">
            {featuredMovie?.overview ||
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae adipisci repellendus eum quasi illo, velit numquam, maxime tempora sint deleniti, aliquid qui?"}
          </p>
          <div className="buttons">
            <Link to={`/movie/${featuredMovie?.id}`} className="play">
              <PlayArrow />
              <span>Play</span>
            </Link>
          </div>
        </div>
      </div>
      <MovieList title="Top Rated Movies" movies={topRatedMovies} />
      <MovieList title="Popular Movies" movies={popularMovies} />
      <MovieList title="Upcoming Movies" movies={upcomingMovies} />
    </div>
  );
}

export default Home;
