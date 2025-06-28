import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.scss";
import MovieList from "../../components/movieList/MovieList";
import { PlayArrow, InfoOutlined } from "@mui/icons-material";
import { fetchMoviesByCategory } from "../../util/http";
import { useQuery } from "react-query";

function Home() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [featuredMovie, setFeaturedMovie] = useState(null);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const { data: topRatedMovies = [] } = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: () => fetchMoviesByCategory("top_rated"),
    staleTime: 1000 * 60 * 5,
  });

  const { data: popularMovies = [] } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: () => fetchMoviesByCategory("popular"),
    staleTime: 1000 * 60 * 5,
  });

  const { data: upcomingMovies = [] } = useQuery({
    queryKey: ["upcomingMovies"],
    queryFn: () => fetchMoviesByCategory("upcoming"),
    staleTime: 1000 * 60 * 5,
  });

  const { data: trendingMovies = [] } = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: () => fetchMoviesByCategory("now_playing"),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (popularMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * Math.min(5, popularMovies.length));
      setFeaturedMovie(popularMovies[randomIndex]);
    }
  }, [popularMovies]);

  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-image-container">
          {!imageLoaded && <div className="hero-skeleton"></div>}
          {featuredMovie && (
            <img
              src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
              alt={featuredMovie.title}
              className={`hero-image ${imageLoaded ? "loaded" : ""}`}
              onLoad={handleImageLoad}
            />
          )}
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-info">
            <h1 className="hero-title">{featuredMovie?.title}</h1>
            <p className="hero-description">
              {featuredMovie?.overview?.length > 200 
                ? `${featuredMovie.overview.substring(0, 200)}...`
                : featuredMovie?.overview
              }
            </p>
            <div className="hero-actions">
              <Link to={`/movie/${featuredMovie?.id}`} className="netflix-button play-button">
                <PlayArrow />
                <span>Play</span>
              </Link>
              <Link to={`/movie/${featuredMovie?.id}`} className="netflix-button secondary info-button">
                <InfoOutlined />
                <span>More Info</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Lists */}
      <div className="movie-lists">
        <MovieList title="Trending Now" movies={trendingMovies} />
        <MovieList title="Popular on Flicknest" movies={popularMovies} />
        <MovieList title="Top Rated" movies={topRatedMovies} />
        <MovieList title="Coming Soon" movies={upcomingMovies} />
      </div>
    </div>
  );
}

export default Home;