import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.scss";
import MovieList from "../../components/movieList/MovieList";
import { PlayArrow } from "@mui/icons-material";
import { fetchMoviesByCategory} from "../../util/http";
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

  useEffect(() => {
    if (popularMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * popularMovies.length);
      setFeaturedMovie(popularMovies[randomIndex]);
    } else {
      setFeaturedMovie(null);
    }
  }, [popularMovies]);

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
